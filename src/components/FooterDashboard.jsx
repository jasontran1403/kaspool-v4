import styles from "../style";
import logo from "../landingpage-assets/img/resources/logo-white.png";

const FooterDashboard = () => (
  <section className={`${styles.flexCenterNav} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-row justify-start mr-10">
        <a href="/">
          <img
            src={logo}
            alt="Kaspool"
            className="w-[180px] h-[120px] object-contain"
          />
        </a>
        <div>
          <p className={`text-white dark:text-grey-200 ${styles.paragraph} max-w-[100%]`}>
            Company name: KAS PHOENIX LTD
          </p>
          <p className={`text-white dark:text-grey-200 ${styles.paragraph} max-w-[100%]`}>
            Company number: 14266614
          </p>
          <p className={`text-white dark:text-grey-200 ${styles.paragraph} max-w-[100%]`}>
            Address: 30 Greenaleigh Road, Birmingham, England, B14 4HZ
          </p>
          <p className={`text-white dark:text-grey-200 ${styles.paragraph} max-w-[100%]`}>
            Company type: Private limited Company
          </p>
          <p className={`text-white dark:text-grey-200 ${styles.paragraph} max-w-[100%]`}>
            Incorporated on: 1 August 2022
          </p>
        </div>
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="text-white dark:text-grey-200 font-poppins font-normal text-center text-[18px] leading-[27px]">
        Copyright Ⓒ 2024 Kaspool. All Rights Reserved.
      </p>
    </div>
  </section>
);

export default FooterDashboard;
