import {
    LoadSponsorAction,
    FullfilledSponsorAction,
    InitFormAction,
    AddSponsorAction,
    DeleteSponsorAction
} from "../types/sponsorsActionsTypes";
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

function initSponsorForm(sponsor: ISponsorForm, open?: boolean): InitFormAction {
    return {
        type: ActionsTypesEnum.INIT_FORM,
        sponsor,
        open
    };
}

function addSponsor(sponsor: ISponsorForm): AddSponsorAction {
    return {
        type: ActionsTypesEnum.ADD_SPONSOR,
        sponsor,
        loading: true
    };
}

function deleteSponsor(documents:Array<string>): DeleteSponsorAction {
    return {
        type: ActionsTypesEnum.DELETE_SPONSOR,
        documents,
        loading: true
    };
}

export {
    loadSponsors,
    fullfilledSponsors,
    initSponsorForm,
    addSponsor,
    deleteSponsor
};