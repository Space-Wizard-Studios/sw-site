import * as migration_20250417_122729_init from './20250417_122729_init';

export const migrations = [
  {
    up: migration_20250417_122729_init.up,
    down: migration_20250417_122729_init.down,
    name: '20250417_122729_init'
  },
];
