import { LoadSponsorAction, FullfilledSponsorAction, InitFomrAction } from "../types/sponsorsActionsTypes";
import ActionsTypesEnum from "../enums/sponsorsActionsTypes.enum";
import ISponsor, { ISponsorForm } from "../interfaces/sponsor.interfaces";

function loadSponsors(): LoadSponsorAction {
    return {
        type: ActionsTypesEnum.LOAD_SPONSORS,
        loading: true
    };
}

function fullfilledSponsors(sponsors: Array<ISponsor>): FullfilledSponsorAction {
    return {
        type: ActionsTypesEnum.FULFILLED_SPONSORS,
        sponsors,
        loading: false
    };
}

function initSponsorForm(sponsor: ISponsorForm, open?:boolean): InitFomrAction {
    return {
        type: ActionsTypesEnum.INIT_FORM,
        sponsor,
        open
    };
}
export { loadSponsors, fullfilledSponsors, initSponsorForm };