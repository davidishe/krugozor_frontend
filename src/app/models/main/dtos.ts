export interface IStrapiDto {
    strapiProposalId: number;
    name?: string;
    description?: string;
    price?: number;
    images?: IStrapiAbstractFieldDto[];
    cities?: IStrapiAbstractFieldDto[];
    proposalTypes?: IStrapiAbstractFieldDto[];
    website?: string;
    email?: string;
    address?: string;
    phone?: string;
    instagramCompanyName?: string;
    telegramCompanyName?: string;
    facebookCompanyName?: string;
    isTechnical?: boolean;
    customMaterials?: IStrapiAbstractFieldDto[];
    customColors?: IStrapiAbstractFieldDto[];
    customSizes?: IStrapiAbstractFieldDto[];
    amenities?: IStrapiAbstractFieldDto[];
    isRealBusinessEnable?: boolean;
}

export interface IStrapiAbstractFieldDto {
    id: number;
    attributes?: any;
}




