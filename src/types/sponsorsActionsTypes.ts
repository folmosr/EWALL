import ISponsor from "../interfaces/sponsor.interfaces";
import SponsorActionTypeEnum from "../enums/sponsorsActionstypes.enum";

export type LoadSponsorAction = {
    type: SponsorActionTypeEnum.LOAD_SPONSORS,
    error?: any,
    loading: boolean
};

export type FullfilledSponsorAction = {
    type: SponsorActionTypeEnum.FULFILLED_SPONSORS,
    sponsors: Array<ISponsor>,
    error?: any,
    loading: boolean
};
