export const changelog = [
  {
    version: '0.1.0',
    info: 'Added cnft.io regular and sweep mode. Sweep mode will reserve any listing under the price limit while regular will reserve only one.'
  },
  {
    version: '0.1.1',
    info: 'Added cnft.io regular and sweep mode. Added policy id monitor mode. Policy id seems a bit slower than tools but' +
        ' tools loads in delayed from where the policy ids are monitored, so listings should be found in similar speed. Only filters the floors right now' +
        ' for policy id mode. USE UNVERIFIED POLICY IDS AT OWN RISK'
  },
  {
    version: '0.1.2',
    info: 'Added discord webhook for successful reservations'
  },
  {
    version: '0.1.21',
    info: 'Fixed bugs with running tasks and monitoring policy ids'
  },
  {
    version: '0.1.22',
    info: 'Policy id monitor improvements. Same notes from update 0.1.1 apply regarding monitor speeds.'
  },
  {
    version: '0.1.23',
    info: 'Policy id monitor mode has additional check on listing to make sure its not reserved before attempting to reserve.' +
        ' also major speed improvements for policy id monitoring'
  },
  {
    version: '0.1.3',
    info: 'Overall task handling improvements' +
        ' Improved Error handling and task status updates' +
        ' Changed monitor modes to floor monitoring and feature filtering. Feature filtering only works for non-custom projects' +
        'Added new projects for feature filtering'
  },
  {
    version: '0.1.31',
    info: 'CNFT fixes to account for new bot security updates. Monitoring by feature is disable for now.'
  }
]

export const membership = {
  type: 'Renewal',
  key: localStorage.getItem('botKey'),
  expiry: 'Aug 2, 2021',
  discord: {
    name: 'James.',
    tag: '#9999',
    image: 'https://cdn.discordapp.com/avatars/442333264364175361/192c81c4e212053dfd7ac2d18ede1ef1.webp?size=128'
  }

}
