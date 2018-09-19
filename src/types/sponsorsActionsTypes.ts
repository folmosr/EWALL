import ISponsor, { ISponsorForm } from "../interfaces/sponsor.interfaces";
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

export type InitFormAction = {
    type: SponsorActionTypeEnum.INIT_FORM,
    sponsor: ISponsorForm,
    open: boolean
};

export type AddSponsorAction = {
    type: SponsorActionTypeEnum.ADD_SPONSOR,
    sponsor: ISponsorForm,
    loading: boolean
};

export type DeleteSponsorAction = {
    type: SponsorActionTypeEnum.DELETE_SPONSOR,
    documents: Array<string>,
    loading: boolean
};