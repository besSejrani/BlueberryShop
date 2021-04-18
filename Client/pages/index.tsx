import React from "react";

// Next
// import Link from "next/link";
// import { useRouter } from "next/router";

// Components
import Promotions from "@Components/Promotions/Promotions";

// SSR
import withApollo from "@Apollo/ssr";

// HOC
import { withNoAuth } from "@Guard/withNoAuth";

// i18n
// import useTranslation from "next-translate/useTranslation";

// ========================================================================================================

const Home: React.FC = () => {
  // let { t } = useTranslation();
  // const router = useRouter();

  return (
    <>
      {/* <h6>{t("common:greeting")}</h6> */}
      {/* <ul>
        {router.locales.map((locale) => (
          <li key={locale}>
            <Link href={router.asPath} locale={locale}>
              <a>{locale}</a>
            </Link>
          </li>
        ))}
      </ul> */}
      <Promotions />
    </>
  );
};

// export async function getStaticProps() {
//   return {
//     props: {},
//   };
// }

export default withApollo({ ssr: true })(withNoAuth(Home));

// =================================================================
