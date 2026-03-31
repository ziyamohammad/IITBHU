import React, { useState } from 'react'
import styles from "../CSS/About.module.css";
import { useNavigate } from 'react-router';

const Active = () => {
     const[active,setActive]=useState("About")
     const navigate = useNavigate()
  return (
    <div className={styles.container}>

      {/* TOP SECTION */}
       <nav className={styles.navbar}>
        <div className={styles.logo}>SafeX</div>
      
        <div className={styles.navWrapper}>
          <span className={active === "Home" ?styles.active:""} onClick={()=>{
             navigate(`/`)
             setActive("Home")}}>Home</span>
          <span className={active === "About" ?styles.active:""} onClick={()=>{
            navigate(`/About`)
            setActive("About")}}>About</span>
        </div>
      </nav>
      <div className={styles.topBox}>
        <div className={styles.topContent}>
          <p>
            <span className={styles.dot}></span>
            In our project, we built a machine learning model that predicts drug toxicity using the Tox21 dataset. The model processes molecular descriptors and chemical structures, learning patterns that distinguish toxic from non-toxic compounds. By training on thousands of compounds with known assay results, the model generates a probability score or classification label that indicates the likelihood of toxicity. Alongside prediction, we also analyzed feature importance to identify which molecular properties contribute most strongly to toxicity risk, giving researchers valuable insights into the structural drivers of adverse effects.
          </p>
        </div>

        <div className={styles.imageBox}>
          <img src="/brain.png" alt="brain" />
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className={styles.bottomBox}>
        
        <div className={styles.leftIcon}>
          <img src="/Group.png" alt="chart" />
        </div>

        <div className={styles.bottomContent}>
          <p>
            <span className={styles.dot}></span>
            To make this work accessible, we developed a simple user interface. In the UI, users can input a compound (for example, through a SMILES string or molecular file) and instantly receive a toxicity prediction. The interface doesn’t just show the output score—it also highlights the molecular descriptors that influenced the prediction, often through visualizations like bar charts. This combination of prediction and interpretability makes the tool practical for drug development teams, helping them quickly assess compounds while understanding the underlying reasons for toxicity risk.
          </p>
        </div>

      </div>

    </div>
  )
}

export default Active
