import * as path from "path";
import * as webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import Dotenv from "dotenv-webpack";
import "webpack-dev-server";

type Env = "production" | "development";

interface ConfigurationProps {
  env: Env;
}

const SERVER_PORT = 3000;

export default ({env}: ConfigurationProps): webpack.Configuration => {
  const isDev = env === "development";
  const isProd = env === "production";

  return {
    mode: env,
    entry: path.join(__dirname, "src/index.tsx"),
    output: {
      path: path.join(__dirname, "build"),
      filename: "[contenthash].bundle.js",
      clean: true,
      publicPath: "/",
    },
    optimization: {
      minimize: isProd,
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
    },
    resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.join(__dirname, "tsconfig.json"),
        }) as unknown as webpack.ResolvePluginInstance,
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(__dirname, "public/index.html"),
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.join(__dirname, "tsconfig.json"),
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
        async: true,
        devServer: true,
      }),
      new ESLintWebpackPlugin({
        extensions: ["js", "ts", "jsx", "tsx"],
        emitError: true,
        emitWarning: false,
      }),
      new Dotenv({
        path: `./.env.${env}`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: "asset/inline",
        },
        {
          test: /\.svg$/i,
          type: "asset/inline",
          resourceQuery: /url/,
        },
      ],
    },
    devtool: isDev && "eval",
    devServer: {
      hot: true,
      port: SERVER_PORT,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "public"),
        publicPath: "/static",
      },
    },
    stats: "errors-warnings",
  };
};
