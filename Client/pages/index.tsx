import React from "react";

// Components
import Promotions from "@Components/Promotions/Promotions";

// SSR
import withApollo from "@Apollo/ssr";

// HOC
import { withNoAuth } from "@Guard/withNoAuth";

// i18n
// import useTranslation from "next-translate/useTranslation";

// ========================================================================================================

const Home: React.FC = () => (
  // let { t } = useTranslation();
  // const router = useRouter();

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
export default withApollo({ ssr: true })(withNoAuth(Home));

// =================================================================
