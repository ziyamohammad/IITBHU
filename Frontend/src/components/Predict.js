import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../CSS/Predict.module.css";
import { Search } from "lucide-react";

const Predict = () => {
  const { smile } = useParams();
  const[smiles,setSmile]=useState(smile)
  const [data, setData] = useState({});
    const[active,setActive]=useState("Home")
    const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "http://localhost:8088/pred",
          { smile:smiles },
          { withCredentials: true }
        );

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [smiles]);

  const receptorMap = {
  "NR-AR": "Nuclear Receptor → Androgen Receptor",
  "NR-AR-LBD": "Nuclear Receptor → Androgen Receptor Ligand Binding Domain",
  "NR-AhR": "Nuclear Receptor → Aryl Hydrocarbon Receptor",
  "NR-Aromatase": "Nuclear Receptor → Aromatase",
  "NR-ER": "Nuclear Receptor → Estrogen Receptor",
  "NR-ER-LBD": "Nuclear Receptor → Estrogen Receptor Ligand Binding Domain",
  "NR-PPAR-gamma": "Nuclear Receptor → Peroxisome Proliferator-Activated Receptor Gamma",
  "SR-ARE": "Stress Response → Antioxidant Response Element",
  "SR-ATAD5": "Stress Response → ATPase Family AAA Domain Containing Protein 5",
  "SR-HSE": "Stress Response → Heat Shock Element",
  "SR-MMP": "Stress Response → Mitochondrial Membrane Potential",
  "SR-p53": "Stress Response → Tumor Protein p53"
};

const barColors = {
  MolWt: "#3b82f6",      // blue
  LogP: "#14b8a6",       // teal
  TPSA: "#22c55e",       // green
  RotBonds: "#84cc16",   // lime
  HAcceptors: "#facc15", // yellow
  HDonors: "#ef4444"     // red
};

  return (
    <div className={styles.container}>
            <nav className={styles.navbar}>
           <div className={styles.logo}>SafeX</div>
         
           <div className={styles.navWrapper}>
             <span className={active === "Home" ?styles.active1:""} onClick={()=>{
                navigate(`/`)
                setActive("Home")}}>Home</span>
             <span className={active === "About" ?styles.active1:""} onClick={()=>{
               navigate(`/About`)
               setActive("About")}}>About</span>
           </div>
         </nav>
        <button className={styles.ctaBtn} >
         <input type="text" value={smiles} className={styles.inputfield} onChange={(e)=>{setSmile(e.target.value)}} placeholder="Try Prediction"/><br/><span><Search color="white" size={22} onClick={()=>{navigate(`/predict/${smiles}`)}}/></span>
        </button>
      <div className={styles.grid}>

        {/* LEFT GRID */}
        <div className={styles.cards}>
          {Object.entries(data).map(([key, value], i) => (
            <div
              key={i}
              className={`${styles.card} ${
                value.prediction === 1
                  ? styles.active
                  : styles.inactive
              }`}
            >
              <div className={styles.top}>
                <span className={styles.title}>
                  {receptorMap[key] || key}
                </span>

                <span className={styles.status}>
                  {value.prediction === 1
                    ? "Active"
                    : "In-active"}
                </span>
              </div>

              <div className={styles.bottom}>
                <span>Probability: {value.probability}</span>
              </div>
              {value.prediction === 1 && (
  <div
    className={styles.expandBtn}
    onClick={() =>
      setExpanded(expanded === key ? null : key)
    }
  >
    ⌄
  </div>
)}
{/* {Object.entries(value.descriptor).map(([k, v], i) => (
  <div key={i} className={styles.barWrapper}>
    
    <div className={styles.barBg}>
      <div
        className={styles.barFill}
        style={{
          height: `${v * 100}%`,
          background: barColors[k] || "#00ffcc"
        }}
      ></div>
    </div>

    <span className={styles.barLabel}>{k}</span>
  </div>
))} */}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Predict;