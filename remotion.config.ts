import { Config } from '@remotion/cli/config';

Config.setConcurrency(1);
Config.setEntryPoint('./src/remotion/index.ts');
Config.setJpegQuality(100);
