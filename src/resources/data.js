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
    isSelected: true,
    isOpened: false,
    subFolder: [
      {
        id: 1,
        depth: 2,
        title: 'SubBookmark 1',
        isSelected: false,
        isOpened: false,
        subFolder: [
          {
            id: 1,
            depth: 3,
            title: 'SubBookmark 11',
            isSelected: false,
          },
          {
            id: 2,
            depth: 3,
            title: 'SubBookmark 22',
            isSelected: false,
          },
          {
            id: 3,
            depth: 3,
            title: 'SubBookmark 33',
            isSelected: false,
            isOpened: false,
            subFolder: [
              {
                id: 1,
                depth: 4,
                title: 'SubBookmark 111',
                isSelected: false,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        depth: 2,
        title: 'SubBookmark 2',
        isSelected: false,
      },
    ],
  },
];
