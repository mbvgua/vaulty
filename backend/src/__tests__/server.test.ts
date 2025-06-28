import supertest from "supertest";

import app from "../app";
import { pool } from "../config/db.config";
import { ResultSetHeader } from "mysql2";

const request = supertest(app);

describe("[server logic tests]", () => {
  it("should ensure server is up and running", async () => {
    expect(request).toBeDefined();
  });

  it("should ensure that the app connects to the database", async () => {
    const [rows]: any = await pool.query("SELECT 1+1 as result;");
    expect(rows[0]).toMatchObject({
      result: 2,
    });
  });

  it("should ensure the 'vaulty' database has been created in the database", async () => {
    const [rows] = await pool.query<ResultSetHeader>(`USE vaulty;`);
    expect(rows).toBeDefined();
    expect(rows.warningStatus).toEqual(0);
  });
});
