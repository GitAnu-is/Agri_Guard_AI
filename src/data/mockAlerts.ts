import type { AppAlert } from '../types';

/** SAMPLE DATA — demo alert stream for the advisory platform. */
export const mockAlerts: AppAlert[] = [
{
  id: 'AL-1041',
  type: 'Disease Alert',
  priority: 'Critical',
  title: 'High disease severity detected in Banana field',
  message:
  'Black Sigatoka detected with 94.6% confidence and High severity on Plot B. Estimated 38% leaf area infected. Immediate isolation and inspection recommended.',
  time: '12 min ago',
  read: false,
  link: '/disease-detection'
},
{
  id: 'AL-1040',
  type: 'Weather Alert',
  priority: 'High',
  title: 'Heavy rainfall expected in 3 days',
  message: 'Forecast shows 48 mm on Thursday and 41 mm on Friday for Gampaha. Harvesting and transport windows are affected.',
  time: '1 hr ago',
  read: false,
  link: '/weather'
},
{
  id: 'AL-1039',
  type: 'Harvest Alert',
  priority: 'High',
  title: 'Optimal harvest window begins tomorrow',
  message: 'Banana (Plot B) reaches 86% harvest readiness. Recommended window: Sep 1 – Sep 3, before the forecast rainfall.',
  time: '3 hrs ago',
  read: false,
  link: '/harvest-planning'
},
{
  id: 'AL-1038',
  type: 'Transportation Alert',
  priority: 'Medium',
  title: 'Transportation risk is moderate for selected route',
  message: 'Gampaha → Colombo Manning Market: 68% damage probability with current packaging. Review the packaging recommendation.',
  time: '5 hrs ago',
  read: false,
  link: '/transportation-risk'
},
{
  id: 'AL-1037',
  type: 'Market Readiness Alert',
  priority: 'Medium',
  title: 'Grade A consignment ready for market',
  message: 'Banana consignment BN-2210 scored 88% market readiness with a 6-day estimated shelf life. Transport within 24–48 hours.',
  time: 'Yesterday',
  read: true,
  link: '/market-readiness'
},
{
  id: 'AL-1036',
  type: 'Storage Alert',
  priority: 'Medium',
  title: 'Storage humidity outside recommended range',
  message: 'Collection-point store recorded 96% RH against a recommended 85–90% for Banana. Increase ventilation.',
  time: 'Yesterday',
  read: true,
  link: '/storage'
},
{
  id: 'AL-1035',
  type: 'Disease Alert',
  priority: 'Low',
  title: 'Anthracnose symptoms not confirmed in Black Pepper',
  message: 'Uploaded image classified Healthy with 91.2% confidence. Continue weekly monitoring of the vine section.',
  time: '2 days ago',
  read: true,
  link: '/disease-history'
},
{
  id: 'AL-1034',
  type: 'Harvest Alert',
  priority: 'Low',
  title: 'Pineapple maturing — 12 days to window',
  message: 'Pineapple (Plot A) at 64% readiness. Predicted optimal window: Sep 12 – Sep 18.',
  time: '3 days ago',
  read: true,
  link: '/harvest-planning'
}];