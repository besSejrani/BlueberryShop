import Router from "next/router";

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { location });
    ctx.res.end();
  } else {
    Router.push(Location);
  }
};
