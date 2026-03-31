import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn

from rdkit import Chem
from rdkit.Chem import Descriptors
from rdkit.Chem import rdFingerprintGenerator

from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputClassifier
from sklearn.ensemble import RandomForestClassifier

class RandomForest():
    def __init__(self, data_csv_path: str = "tox21.csv"):
        self.csv = data_csv_path
        self.X = None
        self.Y = None
        self.model = None
        self.df = None
        self.df_descrip_fp = None
        self.targets = [
            'NR-AR','NR-AR-LBD','NR-AhR','NR-Aromatase',
            'NR-ER','NR-ER-LBD','NR-PPAR-gamma',
            'SR-ARE','SR-ATAD5','SR-HSE','SR-MMP','SR-p53'
        ]
        self.loadModel(data_csv_path)
        self.finger_print()


    def loadModel(self, loc):
        df = pd.read_csv(loc)
        print("Data load: size - ", df.shape)
        self.df = df

    def _descriptors(self, smiles):
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            return None

        return [
            Descriptors.MolWt(mol),
            Descriptors.MolLogP(mol),
            Descriptors.NumHDonors(mol),
            Descriptors.NumHAcceptors(mol),
            Descriptors.TPSA(mol),
            Descriptors.NumRotatableBonds(mol)
        ]


    def _smiles_to_fp(self, smiles):
        if not hasattr(self, 'fpgen') or self.fpgen is None:
            self.fpgen = rdFingerprintGenerator.GetMorganGenerator(radius=2, fpSize=1024)

        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            return None

        fp = self.fpgen.GetFingerprint(mol)
        arr = np.array(fp)
        return arr

    def finger_print(self):

        features = self.df['smiles'].apply(self._descriptors)
        valid_mask = features.notnull()

        features = features[valid_mask]
        df_valid = self.df[valid_mask]

        feature_cols = [
            'MolWt', 'LogP', 'HDonors', 'HAcceptors', 'TPSA', 'RotBonds'
        ]

        features_df = pd.DataFrame(features.tolist(), columns=feature_cols)
        features_df.index = df_valid.index

        df_descrip = pd.concat([df_valid, features_df], axis=1)

        fps =df_descrip['smiles'].apply(self._smiles_to_fp)
        df_descrip = df_descrip[fps.notnull()]
        fps = fps[fps.notnull()]

        fp_df = pd.DataFrame(fps.tolist())
        fp_df.index = df_descrip.index

        self.df_descrip_fp = pd.concat([df_descrip, fp_df], axis=1)

    def train(self):
        self.Y = self.df_descrip_fp[self.targets]

        # drop rows with missing labels in any target column
        non_nan_labels = self.Y.notnull().all(axis=1)
        if non_nan_labels.sum() != len(self.Y):
            dropped = len(self.Y) - non_nan_labels.sum()
            print(f"Dropped {dropped} rows from training set due to NaN labels")

        self.df_descrip_fp = self.df_descrip_fp.loc[non_nan_labels].reset_index(drop=True)
        self.Y = self.df_descrip_fp[self.targets]

        self.X = self.df_descrip_fp.drop(columns=self.targets + ['mol_id', 'smiles'])
        self.X.columns = self.X.columns.astype(str)
        self.X = self.X.fillna(0)  # safety for any remaining missing features

        print("self.X shape:", self.X.shape)
        print("self.Y shape:", self.Y.shape)
        print(self.X.columns[:10])   # just to inspect

        X_train, X_test, y_train, y_test = train_test_split(
            self.X, self.Y, test_size=0.2, random_state=42
        )

        self.model = MultiOutputClassifier(
            RandomForestClassifier(
                n_estimators=200,
                class_weight='balanced_subsample',
                random_state=42,
                n_jobs=-1
            )
        )

        self.model.fit(X_train, y_train)

    def _smiles_to_features(self, smiles):
        mol = Chem.MolFromSmiles(smiles)

        if mol is None:
            raise ValueError("Invalid SMILES string")

        # Descriptors
        desc = [
            Descriptors.MolWt(mol),
            Descriptors.MolLogP(mol),
            Descriptors.NumHDonors(mol),
            Descriptors.NumHAcceptors(mol),
            Descriptors.TPSA(mol),
            Descriptors.NumRotatableBonds(mol)
        ]

        # Fingerprint
        fp = self.fpgen.GetFingerprint(mol)
        fp_array = np.array(fp)

        # Combine
        features = np.concatenate([desc, fp_array])

        return features

    def _prepare_input(self, smiles, X_columns):
        features = self._smiles_to_features(smiles)

        # convert to DataFrame
        input_df = pd.DataFrame([features], columns=X_columns)

        return input_df

    def predict_smiles(self, smiles):

        input_df = self._prepare_input(smiles, self.X.columns)

        preds = self.model.predict(input_df)
        probs = self.model.predict_proba(input_df)

        result = {}

        for i, col in enumerate(self.Y.columns):
            result[col] = {
                "prediction": int(preds[0][i]),
                "probability": float(probs[i][0][1])
            }

        return result