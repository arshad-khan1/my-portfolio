"use client";

import styles from "./BentoGrid.module.scss";
import { RevealFx } from "@once-ui-system/core";
import {
  FiCreditCard,
  FiFolder,
  FiFileText,
  FiSearch,
  FiHeadphones,
  FiStar,
  FiShoppingBag,
} from "react-icons/fi";
import { SiRedis, SiMinio, SiWhatsapp, SiRazorpay } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa6";

export const BentoGrid = () => {
  return (
    <div className={styles.bentoGrid}>
      {/* Card 1: Redis */}
      <div className={`${styles.card} ${styles.item1}`}>
        <SiRedis className={styles.bgIcon} />
        <RevealFx
          delay={0.1}
          translateY="8"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>Integrated Redis</h3>
            <p>Saving DB calls and response time drastically</p>
          </div>
          <div className={styles.visual}>
            <div className={styles.inner}>-80%</div>
          </div>
          <p style={{ textAlign: "center" }}>Database call reductions</p>
        </RevealFx>
      </div>

      {/* Card 2: Agent Routing */}
      <div className={`${styles.card} ${styles.item2}`}>
        <FiHeadphones className={styles.bgIcon} />
        <RevealFx
          delay={0.2}
          translateY="8"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>Agent based routing</h3>
            <p>Connecting clients to support agents quickly</p>
          </div>
          <div className={styles.visual}>
            <div className={styles.inner}>-50%</div>
          </div>
          <p style={{ textAlign: "center" }}>Query resolve time</p>
        </RevealFx>
      </div>

      {/* Card 3: Nexr AI SaaS */}
      <div className={`${styles.card} ${styles.item3}`}>
        <FiStar className={styles.bgIcon} />
        <RevealFx
          delay={0.3}
          translateY="8"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          <h3>Reviews Next AI SaaS</h3>
          <p>
            Helping businesses get more Google reviews and internal feedback,
            boosting their businesses.
          </p>
        </RevealFx>
      </div>

      {/* Card 4: Ecommerce App */}
      <div className={`${styles.card} ${styles.item4}`}>
        <FiShoppingBag className={styles.bgIcon} />
        <RevealFx
          delay={0.4}
          translateY="8"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "flex-end",
            zIndex: 20,
          }}
        >
          <h3>Full Ecommerce Mobile App</h3>
          <p>
            A complete ecommerce platform featuring a comprehensive admin
            dashboard.
          </p>
        </RevealFx>
      </div>

      {/* Card 5: Minio Storage */}
      <div className={`${styles.card} ${styles.item5}`}>
        <SiMinio className={styles.bgIcon} />
        <RevealFx
          delay={0.5}
          translateY="8"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            zIndex: 20,
          }}
        >
          <div>
            <h3>Minio Storage Drive</h3>
            <p>
              Created a storage solution mimicking Google Drive's capabilities.
            </p>
          </div>
          <div className={styles.driveWireframe}>
            <div className={styles.sidebar}>
              <div className={styles.navItem} />
              <div className={styles.navItem} />
              <div className={styles.navItem} />
            </div>
            <div className={styles.main}>
              <div className={styles.searchBar}>
                <FiSearch size={12} />
              </div>
              <div className={styles.filesGrid}>
                <div className={styles.folder}>
                  <FiFolder size={16} />
                </div>
                <div className={styles.folder}>
                  <FiFolder size={16} />
                </div>
                <div className={styles.file}>
                  <FiFileText size={16} />
                </div>
                <div className={styles.file}>
                  <FiFileText size={16} />
                </div>
              </div>
            </div>
          </div>
        </RevealFx>
      </div>

      {/* Card 6: Whatsapp Pipeline */}
      <div className={`${styles.card} ${styles.item6}`}>
        <SiWhatsapp className={styles.bgIcon} />
        <RevealFx
          delay={0.6}
          translateY="8"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          <div className={styles.iconWrap}>
            <FaWhatsapp />
          </div>
          <p>Whatsapp messaging pipeline</p>
        </RevealFx>
      </div>

      {/* Card 7: Razorpay */}
      <div className={`${styles.card} ${styles.item7}`}>
        <SiRazorpay className={styles.bgIcon} />
        <RevealFx
          delay={0.7}
          translateY="8"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          <div className={styles.iconWrap}>
            <FiCreditCard />
          </div>
          <p>Razorpay Gateway Integrations</p>
        </RevealFx>
      </div>
    </div>
  );
};
