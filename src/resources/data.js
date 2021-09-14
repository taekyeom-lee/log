import icon from './img/logo512.png';
import google from './img/google.png';
import facebook from './img/facebook.png';
import instagram from './img/instagram.png';
import netflix from './img/netflix.png';
import twitter from './img/twitter.png'
import folder from './img/folder.svg'

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
    type: 'folder',
    title: 'Bookmark 1',
    icon: folder,
    isSelected: true,
    isOpened: false,
    subFolder: [
      {
        id: 2,
        depth: 2,
        type: 'folder',
        title: 'SubBookmark 1',
        icon: folder,
        isSelected: false,
        isOpened: false,
        subFolder: [
          {
            id: 4,
            depth: 3,
            type: 'folder',
            title: 'SubBookmark 11',
            icon: folder,
            isSelected: false,
          },
          {
            id: 5,
            depth: 3,
            type: 'folder',
            title: 'SubBookmark 22',
            icon: folder,
            isSelected: false,
          },
          {
            id: 6,
            depth: 3,
            type: 'folder',
            title: 'SubBookmark 33',
            icon: folder,
            isSelected: false,
            isOpened: false,
            subFolder: [
              {
                id: 7,
                depth: 4,
                type: 'folder',
                title: 'SubBookmark 111',
                icon: folder,
                isSelected: false,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        depth: 2,
        type: 'folder',
        title: 'SubBookmark 2',
        icon: folder,
        isSelected: false,
      },
      {
        id: 8,
        depth: 2,
        type: 'bookmark',
        title: 'Google',
        url: 'https://www.google.com/',
        icon: google,
      },
      {
        id: 9,
        depth: 2,
        type: 'bookmark',
        title: 'Facebook',
        url: 'https://www.facebook.com/',
        icon: facebook,
      },
      {
        id: 10,
        depth: 2,
        type: 'bookmark',
        title: 'Instagram',
        url: 'https://www.instagram.com/',
        icon: instagram,
      },
      {
        id: 11,
        depth: 2,
        type: 'bookmark',        
        title: 'Netflix',
        url: 'https://www.netflix.com/',
        icon: netflix,
      },
      {
        id: 12,
        depth: 2,
        type: 'bookmark',
        title: 'Twitter',
        url: 'https://twitter.com/',
        icon: twitter,
      },
    ],
  },
];
