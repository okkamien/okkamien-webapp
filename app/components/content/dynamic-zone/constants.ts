export const populateDynamicZone = {
  content: {
    populate: {
      anchor: '*',
      contact: '*',
      content: '*',
      events: {
        populate: ['location', 'thumbnail'],
      },
      files: '*',
      image: '*',
      images: '*',
      when: '*',
      where: {
        populate: ['location'],
      },
    },
  },
}
