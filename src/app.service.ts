import { Injectable } from '@nestjs/common';
import { DATABASE_ID, NOTION_KEY } from 'settings';
import axios from 'axios';
import { isFullPage } from '@notionhq/client';
import { getFields, updateFields } from 'utils';
import { IRaised } from 'models/IRaised';

@Injectable()
export class AppService {
  async postRaised({ name, raised }: IRaised) {
    console.log(`${name} +${raised} Robux`);
    const TRaised = Math.ceil(raised * 0.6);
    const fields = await getFields({
      property: 'Name',
      rich_text: {
        equals: name,
      },
    });

    for (const page of fields) {
      if (!isFullPage(page)) {
        continue;
      }
      const oldProps = page.properties;
      const pageId = page.id;
      const newFields = {
        Raised: oldProps.Raised,
        ['Last time']: oldProps['Last time'],
        ['Raised today']: oldProps['Raised today'],
      };
      if (oldProps.Raised.type === 'number' && newFields.Raised.type === 'number') {
        newFields.Raised.number = oldProps.Raised.number + TRaised;
      }
      if (
        oldProps['Last time'].type === 'number' &&
        oldProps['Raised today'].type === 'number' &&
        newFields['Last time'].type === 'number' &&
        newFields['Raised today'].type === 'number'
      ) {
        const lastTime = oldProps['Last time'].number;
        const time = new Date().setHours(0, 0, 0, 0);
        if (lastTime !== time) {
          newFields['Last time'].number = time;
          newFields['Raised today'].number = TRaised;
        } else {
          newFields['Raised today'].number = oldProps['Raised today'].number + TRaised;
        }
        updateFields(pageId, newFields);
      }
    }
  }
}
