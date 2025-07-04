export interface sqlConfigOptions {
  host: string;
  user?: string;
  password?: string;
  database?: string;
  waitForConnections?: boolean;
  connectionLimit?: number;
  maxIdle?: number;
  idleTimeout?: number;
  queueLimit?: number;
  enableKeepAlive?: boolean;
  keepAliveInitialDelay?: number;
}

export interface sqlError {
  code: string;
  errno: number;
  sql: string;
  sqlState: string;
  sqlMessage: string;
}

// result set header returned by the [rows] in mysql
export interface CustomResultSetHeader {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  stateChanges: {
    systemVariables: {};
    schema: string;
    gtids: [];
    trackStateChange?: string;
  };
  changedRows: number;
}
