import Router from "next/router";

export default (context: any, target: string) => {
  if (context.res) {
    context.res.writeHead(302, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
};
