import icon from './img/logo512.png';

export const bookmarks = [
  {
    id: 1,
    title: 'Google',
    url: 'https://www.google.com/',
    icon: icon,
  },
  {
    id: 2,
    title: 'Netflix',
    url: 'https://www.netflix.com/',
    icon: icon,
  },
  {
    id: 3,
    title: 'Instagram',
    url: 'https://www.instagram.com/',
    icon: icon,
  },
  {
    id: 4,
    title: 'Facebook',
    url: 'https://www.facebook.com/',
    icon: icon,
  },
  {
    id: 5,
    title: 'Twitter',
    url: 'https://twitter.com/',
    icon: icon,
  },
  {
    id: 6,
    title: 'Amazon',
    url: 'https://www.amazon.com/',
    icon: icon,
  },
];

export const folders = [
  {
    id: 1,
    depth: 1,
    title: 'Bookmark 1',
    selected: 'true',
    subFolder: [
      {
        id: 1,
        depth: 2,
        title: 'SubBookmark 1',
        selected: 'false',
        subFolder: [
          {
            id: 1,
            depth: 3,
            title: 'SubBookmark 11',
            selected: 'false',
          },
          {
            id: 2,
            depth: 3,
            title: 'SubBookmark 22',
            selected: 'false',
          },
          {
            id: 3,
            depth: 3,
            title: 'SubBookmark 33',
            selected: 'false',
            subFolder: [
              {
                id: 1,
                depth: 4,
                title: 'SubBookmark 111',
                selected: 'false',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        depth: 2,
        title: 'SubBookmark 2',
        selected: 'false',
      },
    ],
  },
];
