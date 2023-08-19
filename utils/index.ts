import { Client, isFullPage } from '@notionhq/client';
import { BaseTextBlock } from 'notion-types';
import { DATABASE_ID, NOTION_KEY } from 'settings';

const client = new Client({
  auth: NOTION_KEY,
});

export const getFields = async (filter: any) => {
  const response = await client.databases.query({
    database_id: DATABASE_ID,
    filter,
  });
  return response.results;
};

export const updateFields = async (pageId: string, properties: any) => {
  client.pages.update({ page_id: pageId, properties });
};
