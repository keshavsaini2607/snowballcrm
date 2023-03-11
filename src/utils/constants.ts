export const API = {
   BASE_URL:
      "http://snowball-crm-prod-lb-140824610.ap-southeast-2.elb.amazonaws.com",
};

export const homeNavTabs = [
   {
      id: "1",
      title: "Sales CRM",
      route: "",
   },
   {
      id: "2",
      title: "Natural-language",
      route: "",
   },
   {
      id: "3",
      title: "Document processing",
      route: "",
   },
   {
      id: "4",
      title: "What we do",
      route: "",
   },
];


export const verifyEmailTxt = "You would have received an email from us with a verification link. Please click on the link to verify the email ID."

export enum UserRegistrationStep {
   VERIFIED = "CREATE_PASSWORD",
   
}

export const dashboardMenu = [
   {
      id: '1',
      title: 'Leads',
      icon: "leads"
   },
   {
      id: '2',
      title: 'Deals',
      icon: "deals"
   },
   {
      id: '3',
      title: 'Client Profile',
      icon: "clientprofile"
   },
   {
      id: '4',
      title: 'Analytics',
      icon: "analytics"
   },
   {
      id: '5',
      title: 'Client Onboarding',
      icon: "clientonboarding"
   },
   {
      id: '6',
      title: 'Learn',
      icon: "learn"
   },
   {
      id: '7',
      title: 'Administration',
      icon: "administration"
   },
   {
      id: '8',
      title: 'Settings',
      icon: "settings"
   },
   
]