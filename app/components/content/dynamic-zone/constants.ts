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
      staff: {
        populate: ['photo'],
      },
      when: '*',
      where: {
        populate: ['location'],
      },
    },
  },
}
