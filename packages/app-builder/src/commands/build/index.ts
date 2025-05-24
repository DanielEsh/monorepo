import { buildMode } from "../../common/types";
import chalk from "chalk";
import { rspackConfigFactory } from "../../common/rspack/config";
import { logger } from "../../common/logger";
import { rspack } from "@rspack/core";

export default async function () {
    process.env.NODE_ENV = buildMode.production;
    console.log(chalk.bgHex('#184ea1')('BUILD #184ea1'));

    const config = rspackConfigFactory({
        buildMode: buildMode.production,
    });

    const compiler = rspack(config);

    return new Promise<void>((resolve, reject) => {
        compiler.run((err, stats) => {
            // if (err) {
            //     logger.error("Ошибка компиляции:", err);
            //     return reject(err);
            // }

            const info = stats?.toJson();

            if (stats?.hasErrors()) {
                logger.error("Ошибки сборки:");
                info?.errors?.forEach((e) => logger.error(e.message));
                return reject(new Error("Сборка завершилась с ошибками."));
            }

            // if (stats?.hasWarnings()) {
            //     logger.warn("Предупреждения сборки:");
            //     info?.warnings?.forEach((w) => logger.warn(w.message));
            // }

            logger.success("Сборка завершена успешно.");
            // compiler.close((closeErr) => {
            //     if (closeErr) {
            //         logger.warn("Ошибка при закрытии компилятора:", closeErr);
            //     }
            //     resolve();
            // });
        });

        process.on("SIGINT", () => {
            compiler.close(() => {
                process.exit(1);
            });
        });

        process.on("SIGTERM", () => {
            compiler.close(() => {
                process.exit(1);
            });
        });
    });
}
