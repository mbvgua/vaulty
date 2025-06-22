export interface nodeMailerConfigOptions {
  host: string;
  service: string;
  port: number;
  auth: {
    user?: string;
    pass?: string;
  };
}

export interface nodeMailerMessageOptions {
  from?: string;
  to?: string;
  subject: string;
  html: string;
}
