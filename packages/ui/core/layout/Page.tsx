import { FunctionComponent } from "react";
import Head from "next/head";

import {
  HorizontalCenterLayout,
  VerticalCenterLayout
} from "../../utils/layout";

interface PageProps {
  title: string;
}

export const Page: FunctionComponent<PageProps> = ({ children, title }) => {
  return (
    <VerticalCenterLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <HorizontalCenterLayout>{children}</HorizontalCenterLayout>
    </VerticalCenterLayout>
  );
};
