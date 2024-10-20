import { builder } from '@builder.io/react';
import type { NextApiRequest, NextApiResponse } from 'next';

builder.init('YOUR_BUILDER_API_KEY');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;

  const content = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + (path as string[]).join('/') || undefined,
      },
    })
    .toPromise();

  res.json({ content });
}