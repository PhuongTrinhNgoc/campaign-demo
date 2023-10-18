interface Campaign {
  information: {
    name: string;
    describe?: string;
  };
  subCampaigns: SubCampaign[];
}

interface SubCampaign {
  name: string;
  status: boolean;
  ads: Ad[];
}

interface Ad {
  name: string;
  quantity: number;
}

const initialCampaign: Campaign = {
  information: {
    name: '',
    describe: '',
  },
  subCampaigns: [
    {
      name: 'Chiến dịch con 1',
      status: true,
      ads: [{ name: 'Quảng cáo', quantity: 0 }],
    },
  ],
};

export { initialCampaign };
