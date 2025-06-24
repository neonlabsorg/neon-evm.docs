import React, { useState } from 'react';
import cardsList from '@site/static/data/cards-list.json';
import Link from '@docusaurus/Link';
import './styles.css';

export interface QuickStartCardLink {
  id: number;
  title: string;
  url?: string;
}

export interface QuickStartCardData {
  id: number;
  title: string;
  description?: string;
  links: QuickStartCardLink[];
}

export function QuickStartItem({ data }: { data: QuickStartCardLink }) {
  return <>
    <div>
      <div className={'quick-start-content'}>
        <div className={'quick-start-title'}>{data.title}</div>
      </div>
    </div>
  </>;
}

export function QuickStartList<FC>() {
  const [list] = useState<QuickStartCardData[]>(cardsList);

  return (
    <div>
      <div className='cards-wrapper'>
        {list.map((item) => (
          <div className='card-item' key={item.id}>
            <h3 className='card-item__title'>{ item.title }</h3>
            <p className='card-item__description'>{ item.description }</p>
            { item.links.map((link) => (
              <Link className='card-item__link' to={link.url} key={link.id}>
                { link.title }
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className='action-cards-wrapper'></div>
    </div>
  )
}
