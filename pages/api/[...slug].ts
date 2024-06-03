/* eslint-disable */
import axios, {AxiosError} from 'axios'
import {NextApiHandler} from 'next'

const handler: NextApiHandler = async ({method, query: {slug, ...query}}, res) => {
  if (method === 'GET') {
    try {
      const data = {
        success: true,
        data: [
          {
            id: 1,
            attributes: {
              title: 'Lorem ipsum',
              slug: 'lorem-ipsum',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt, nisi sit amet mollis facilisis, erat tellus cursus orci, at tristique libero dolor in nisl. Aenean congue justo sit amet ullamcorper porttitor. Nullam vehicula justo eget augue vestibulum, sit amet tincidunt metus aliquam. Mauris pharetra dui sit amet ex mattis, ut convallis orci commodo. Etiam ullamcorper, leo eu efficitur eleifend, velit velit pulvinar orci, vulputate bibendum velit quam in justo. Pellentesque vel suscipit nisl. Nullam sed aliquet dolor. Maecenas id diam sed libero mollis rhoncus sit amet in felis. Fusce tincidunt tellus non elit interdum, in eleifend enim malesuada. Phasellus hendrerit diam nec mauris laoreet dictum. Maecenas lectus urna, tristique ut varius et, lobortis sed tortor. Morbi aliquam est nec finibus tempor.',
              teaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt, nisi sit amet mollis facilisis.',
              createdAt: '2024-01-05T01:28:24.925Z',
              updatedAt: '2024-05-22T00:23:38.728Z',
              publishedAt: '2024-01-05T01:44:48.743Z',
            },
          },
          {
            id: 2,
            attributes: {
              title: 'Dolor sit amet',
              slug: 'dolor-sit-amet',
              content:
                'Fusce iaculis, nisl et euismod semper, erat sapien sollicitudin mauris, in dictum urna nunc vel libero. Vestibulum venenatis volutpat libero at dapibus. Sed viverra pulvinar pretium. Aenean sit amet laoreet nibh, non congue elit. Donec commodo lectus ut accumsan feugiat. Vestibulum eget placerat dolor. Ut in fringilla arcu, quis porta diam. Donec ultrices mi id gravida pharetra. Vestibulum rutrum ante quis rutrum consectetur. Nulla consectetur nunc velit, nec mollis ante gravida ac. Mauris nec nibh vehicula, semper ipsum a, ornare tellus. Proin pulvinar efficitur erat sed porta. Mauris id auctor lacus. Donec at sem diam. Donec sed orci non mi ullamcorper pulvinar. Vestibulum rutrum ac ex ut ornare.',
              teaser: 'Fusce iaculis, nisl et euismod semper, erat sapien sollicitudin mauris, in dictum urna nunc vel libero.',
              createdAt: '2024-01-05T01:45:07.669Z',
              updatedAt: '2024-05-22T00:23:52.510Z',
              publishedAt: '2024-01-05T01:45:08.655Z',
            },
          },
          {
            id: 3,
            attributes: {
              title: 'Vestibulum iaculis magna',
              slug: 'vestibulum-iaculis-magna',
              content:
                'Vestibulum iaculis magna a luctus finibus. Sed viverra nisi ac placerat viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin vulputate tellus a semper porta. Cras eget est consectetur, molestie felis in, elementum erat. In vehicula non mi sed pharetra. Aenean risus nunc, accumsan eget mauris vel, laoreet ornare quam. Quisque gravida orci sit amet ex rutrum, eu sodales lorem gravida. Nam sapien quam, rutrum sed imperdiet ac, ultricies id ipsum. Morbi sed ultrices nunc. In sed eleifend lorem. Curabitur euismod pellentesque sem. Suspendisse potenti. Suspendisse quis aliquet leo. Integer aliquet nec leo non varius. Phasellus purus nunc, volutpat non metus id, congue sagittis dui.',
              teaser: null,
              createdAt: '2024-01-05T18:34:08.719Z',
              updatedAt: '2024-01-05T18:34:10.506Z',
              publishedAt: '2024-01-05T18:34:10.504Z',
            },
          },
          {
            id: 4,
            attributes: {
              title: 'Aliquam cursus consequat mi, quis pulvinar velit tristique vitae',
              slug: 'aliquam-cursus-consequat-mi-quis-pulvinar-velit-tristique-vitae',
              content:
                'Aliquam cursus consequat mi, quis pulvinar velit tristique vitae. Quisque dictum libero ac ornare sollicitudin. Morbi id congue massa, id porta ante. Aliquam suscipit suscipit tincidunt. Mauris dapibus tortor a nulla ultricies, id laoreet mauris scelerisque. Maecenas tincidunt rhoncus lacus in tempor. Maecenas velit nisl, fermentum sed laoreet vel, eleifend ac ligula. In hac habitasse platea dictumst. Maecenas id massa risus. Nulla ullamcorper molestie massa nec aliquam. Cras quis mi fringilla, blandit nisl nec, iaculis dui. Sed luctus lacus vel feugiat dictum. Duis iaculis a ligula non viverra. Mauris porta interdum ornare. Pellentesque et ligula sagittis, tempus elit a, pretium justo. Curabitur eu odio urna.',
              teaser: 'Aliquam cursus consequat mi, quis pulvinar velit tristique vitae. Quisque dictum libero ac ornare sollicitudin.',
              createdAt: '2024-01-05T18:34:29.182Z',
              updatedAt: '2024-05-22T00:24:05.000Z',
              publishedAt: '2024-01-05T18:34:32.736Z',
            },
          },
          {
            id: 5,
            attributes: {
              title: 'Aenean congue justo sit amet ullamcorper porttitor',
              slug: 'aenean-congue-justo-sit-amet-ullamcorper-porttitor',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt, nisi sit amet mollis facilisis, erat tellus cursus orci, at tristique libero dolor in nisl. Aenean congue justo sit amet ullamcorper porttitor. Nullam vehicula justo eget augue vestibulum, sit amet tincidunt metus aliquam. Mauris pharetra dui sit amet ex mattis, ut convallis orci commodo. Etiam ullamcorper, leo eu efficitur eleifend, velit velit pulvinar orci, vulputate bibendum velit quam in justo. Pellentesque vel suscipit nisl. Nullam sed aliquet dolor. Maecenas id diam sed libero mollis rhoncus sit amet in felis. Fusce tincidunt tellus non elit interdum, in eleifend enim malesuada. Phasellus hendrerit diam nec mauris laoreet dictum. Maecenas lectus urna, tristique ut varius et, lobortis sed tortor. Morbi aliquam est nec finibus tempor.',
              teaser:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt, nisi sit amet mollis facilisis, erat tellus cursus orci.',
              createdAt: '2024-01-05T18:35:51.188Z',
              updatedAt: '2024-05-22T00:24:11.608Z',
              publishedAt: '2024-01-05T18:35:52.559Z',
            },
          },
          {
            id: 6,
            attributes: {
              title: 'Fusce iaculis, nisl et euismod semper',
              slug: 'fusce-iaculis-nisl-et-euismod-semper',
              content:
                'Fusce iaculis, nisl et euismod semper, erat sapien sollicitudin mauris, in dictum urna nunc vel libero. Vestibulum venenatis volutpat libero at dapibus. Sed viverra pulvinar pretium. Aenean sit amet laoreet nibh, non congue elit. Donec commodo lectus ut accumsan feugiat. Vestibulum eget placerat dolor. Ut in fringilla arcu, quis porta diam. Donec ultrices mi id gravida pharetra. Vestibulum rutrum ante quis rutrum consectetur. Nulla consectetur nunc velit, nec mollis ante gravida ac. Mauris nec nibh vehicula, semper ipsum a, ornare tellus. Proin pulvinar efficitur erat sed porta. Mauris id auctor lacus. Donec at sem diam. Donec sed orci non mi ullamcorper pulvinar. Vestibulum rutrum ac ex ut ornare.',
              teaser: 'Fusce iaculis, nisl et euismod semper, erat sapien sollicitudin mauris, in dictum urna nunc vel libero.',
              createdAt: '2024-01-05T18:36:14.716Z',
              updatedAt: '2024-05-22T00:23:44.422Z',
              publishedAt: '2024-01-05T18:36:15.177Z',
            },
          },
          {
            id: 7,
            attributes: {
              title: 'Quisque gravida orci sit amet ex rutrum',
              slug: 'quisque-gravida-orci-sit-amet-ex-rutrum',
              content:
                'Vestibulum iaculis magna a luctus finibus. Sed viverra nisi ac placerat viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin vulputate tellus a semper porta. Cras eget est consectetur, molestie felis in, elementum erat. In vehicula non mi sed pharetra. Aenean risus nunc, accumsan eget mauris vel, laoreet ornare quam. Quisque gravida orci sit amet ex rutrum, eu sodales lorem gravida. Nam sapien quam, rutrum sed imperdiet ac, ultricies id ipsum. Morbi sed ultrices nunc. In sed eleifend lorem. Curabitur euismod pellentesque sem. Suspendisse potenti. Suspendisse quis aliquet leo. Integer aliquet nec leo non varius. Phasellus purus nunc, volutpat non metus id, congue sagittis dui.',
              teaser: 'Vestibulum iaculis magna a luctus finibus. Sed viverra nisi ac placerat viverra.',
              createdAt: '2024-01-05T18:36:36.559Z',
              updatedAt: '2024-05-22T00:22:46.252Z',
              publishedAt: '2024-01-05T18:36:38.070Z',
            },
          },
          {
            id: 8,
            attributes: {
              title: 'Nullam sed aliquet dolor',
              slug: 'nullam-sed-aliquet-dolor',
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt, nisi sit amet mollis facilisis, erat tellus cursus orci, at tristique libero dolor in nisl. Aenean congue justo sit amet ullamcorper porttitor. Nullam vehicula justo eget augue vestibulum, sit amet tincidunt metus aliquam. Mauris pharetra dui sit amet ex mattis, ut convallis orci commodo. Etiam ullamcorper, leo eu efficitur eleifend, velit velit pulvinar orci, vulputate bibendum velit quam in justo. Pellentesque vel suscipit nisl. Nullam sed aliquet dolor. Maecenas id diam sed libero mollis rhoncus sit amet in felis. Fusce tincidunt tellus non elit interdum, in eleifend enim malesuada. Phasellus hendrerit diam nec mauris laoreet dictum. Maecenas lectus urna, tristique ut varius et, lobortis sed tortor. Morbi aliquam est nec finibus tempor.',
              teaser: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt, nisi sit amet mollis facilisis.',
              createdAt: '2024-01-05T18:36:57.021Z',
              updatedAt: '2024-05-22T00:23:16.899Z',
              publishedAt: '2024-01-05T18:37:02.211Z',
            },
          },
          {
            id: 9,
            attributes: {
              title: 'Cras quis mi fringilla',
              slug: 'cras-quis-mi-fringilla',
              content:
                'Aliquam cursus consequat mi, quis pulvinar velit tristique vitae. Quisque dictum libero ac ornare sollicitudin. Morbi id congue massa, id porta ante. Aliquam suscipit suscipit tincidunt. Mauris dapibus tortor a nulla ultricies, id laoreet mauris scelerisque. Maecenas tincidunt rhoncus lacus in tempor. Maecenas velit nisl, fermentum sed laoreet vel, eleifend ac ligula. In hac habitasse platea dictumst. Maecenas id massa risus. Nulla ullamcorper molestie massa nec aliquam. Cras quis mi fringilla, blandit nisl nec, iaculis dui. Sed luctus lacus vel feugiat dictum. Duis iaculis a ligula non viverra. Mauris porta interdum ornare. Pellentesque et ligula sagittis, tempus elit a, pretium justo. Curabitur eu odio urna.',
              teaser: 'Aliquam cursus consequat mi, quis pulvinar velit tristique vitae. Quisque dictum libero ac ornare sollicitudin.',
              createdAt: '2024-01-05T18:37:21.758Z',
              updatedAt: '2024-05-22T00:23:58.301Z',
              publishedAt: '2024-01-05T18:37:22.526Z',
            },
          },
          {
            id: 10,
            attributes: {
              title: 'Mauris nec nibh vehicula, semper ipsum',
              slug: 'mauris-nec-nibh-vehicula-semper-ipsum',
              content:
                'Fusce iaculis, nisl et euismod semper, erat sapien sollicitudin mauris, in dictum urna nunc vel libero. Vestibulum venenatis volutpat libero at dapibus. Sed viverra pulvinar pretium. Aenean sit amet laoreet nibh, non congue elit. Donec commodo lectus ut accumsan feugiat. Vestibulum eget placerat dolor. Ut in fringilla arcu, quis porta diam. Donec ultrices mi id gravida pharetra. Vestibulum rutrum ante quis rutrum consectetur. Nulla consectetur nunc velit, nec mollis ante gravida ac. Mauris nec nibh vehicula, semper ipsum a, ornare tellus. Proin pulvinar efficitur erat sed porta. Mauris id auctor lacus. Donec at sem diam. Donec sed orci non mi ullamcorper pulvinar. Vestibulum rutrum ac ex ut ornare.',
              teaser: 'Fusce iaculis, nisl et euismod semper, erat sapien sollicitudin mauris, in dictum urna nunc vel libero.',
              createdAt: '2024-01-05T18:37:44.570Z',
              updatedAt: '2024-05-22T00:23:26.588Z',
              publishedAt: '2024-01-05T18:37:46.341Z',
            },
          },
          {
            id: 11,
            attributes: {
              title: 'Praesent posuere justo non quam consectetur molestie',
              slug: 'praesent-posuere-justo-non-quam-consectetur-molestie',
              content:
                'Praesent posuere justo non quam consectetur molestie. Pellentesque suscipit, justo sit amet eleifend suscipit, nisi enim egestas nisl, et eleifend enim arcu eget est. Pellentesque nulla nunc, dapibus in lacus a, imperdiet ullamcorper sapien. Donec varius sit amet eros id posuere. Quisque aliquam purus mollis nibh maximus tristique. Nulla quam ex, ornare sed pulvinar ac, varius a dui. Nam ultrices eros sed metus tempus, gravida sollicitudin leo varius. Maecenas vestibulum tortor sapien, non sagittis metus iaculis et. Nunc eu lectus quis leo rutrum condimentum. Mauris laoreet quis sapien scelerisque convallis. Integer lobortis efficitur mi, non aliquam nibh viverra ut. Donec ac ligula pretium, accumsan quam at, ullamcorper velit. Vestibulum posuere faucibus dolor et ultricies. Vestibulum tempor nulla nec justo molestie tempor.',
              teaser:
                'Praesent posuere justo non quam consectetur molestie. Pellentesque suscipit, justo sit amet eleifend suscipit, nisi enim egestas nisl.',
              createdAt: '2024-01-05T18:38:07.933Z',
              updatedAt: '2024-05-22T00:23:08.151Z',
              publishedAt: '2024-01-05T18:38:08.488Z',
            },
          },
        ],
        meta: {pagination: {page: 1, pageSize: 25, pageCount: 1, total: 11}},
      }

      return res.status(200).json({
        ...data,
      })
    } catch (e) {
      if (e instanceof AxiosError) {
        return res.status(e.response?.status ?? 500).json({
          success: false,
          error: e.response?.data.error.name,
        })
      } else
        return res.status(500).json({
          success: false,
          error: 'UnknownError',
        })
    }
  } else return res.status(405).end()
}

export default handler
