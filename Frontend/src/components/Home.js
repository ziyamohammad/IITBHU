import React, { useState } from "react";
import styles from "../CSS/Home.module.css";
import {  ChartLine, Cpu, Database, Search } from "lucide-react";
import { useNavigate } from "react-router";



const Hero = () => {
  const navigate = useNavigate()
  const[smiles,setSmile]=useState("")
  const[active,setActive]=useState("Home")

  
  return (
    <div className={styles.container}>
      
      {/* Navbar */}
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
      {/* Hero Content */}
      <div className={styles.heroContent}>
        <h1>Predict Drug Toxicity with AI</h1>
        <p>
          Reducing risks, saving costs, and ensuring safer medicines through
          intelligent molecular analysis.
        </p>
        
        <button className={styles.ctaBtn} >
         <input type="text" value={smiles} className={styles.inputfield} onChange={(e)=>{setSmile(e.target.value)}} placeholder="Try Prediction"/><br/><span><Search color="white" size={20} onClick={()=>{navigate(`/predict/${smiles}`)}}/></span>
        </button>
      </div>
      <div className={styles.glow}></div>

      {/* Cards */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.head}>
            <span><Database/></span>
             <h3>Transforms chemical data into usable insights</h3>
          </div>
          <div className={styles.content}>
            <div className={styles.contentimg}>
               <img src="img1.png" alt="" width="100%" height="100%"/>
            </div>
            <div className={styles.contenttext}>
              <p>Smart Data Handelling.</p>
              <p>Processes complex molecular descriptors automatically.</p>
              <p>Ensure Accuracy and Consistency.</p>
            </div>
          </div>
          
         
          
        </div>

       <div className={styles.card}>
          <div className={styles.head}>
            <span><Cpu/></span>
             <h3>Transforms chemical data into usable insights</h3>
          </div>
          <div className={styles.content}>
            <div className={styles.contentimg}>
               <img src="/img2.png" alt=""  width="100%" height="100%"/>
            </div>
            <div className={styles.contenttext}>
              <p>Smart Data Handelling.</p>
              <p>Processes complex molecular descriptors automatically.</p>
              <p>Ensure Accuracy and Consistency.</p>
            </div>
          </div>
          
         
          
        </div>

        <div className={styles.card}>
          <div className={styles.head}>
            <span><ChartLine/></span>
             <h3>Transforms chemical data into usable insights</h3>
          </div>
          <div className={styles.content}>
            <div className={styles.contentimg}>
               <img src="/img3.png" alt="" width="100%" height="100%"/>
            </div>
            <div className={styles.contenttext}>
              <p>Smart Data Handelling.</p>
              <p>Processes complex molecular descriptors automatically.</p>
              <p>Ensure Accuracy and Consistency.</p>
            </div>
          </div>
          
         
          
        </div>
      </div>
    </div>
  );
};

export default Hero;