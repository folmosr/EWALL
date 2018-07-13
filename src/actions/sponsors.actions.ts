import { LoadSponsorAction, FullfilledSponsorAction } from "../types/sponsorsActionsTypes";
import ActionsTypesEnum from "../enums/sponsorsActionsTypes.enum";
import ISponsor from "../interfaces/sponsor.interfaces";

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

export { loadSponsors, fullfilledSponsors };