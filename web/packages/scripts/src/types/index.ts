import type { ChangelogOption } from '@soybeanjs/changelog';

export interface CliOption {
  /** The project root directory */
  cwd: string;
  /**
   * Cleanup dirs
   *
   * @default
   * ```json
   * ["** /dist", "** /pnpm-lock.yaml", "** /node_modules", "!node_modules/**"]
   * ```
   */
  cleanupDirs: string[];
  /** Git commit types */
  gitCommitTypes: [string, string][];
  /** Git commit scopes */
  gitCommitScopes: [string, string][];
  /**
   * Npm-check-updates command args
   *
   * @default ['--deep', '-u']
   */
  ncuCommandArgs: string[];
  /**
   * Options of generate changelog
   *
   * @link
   */
  changelogOptions: Partial<ChangelogOption>;
}
