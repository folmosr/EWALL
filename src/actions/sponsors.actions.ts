import {
    LoadSponsorAction,
    FullfilledSponsorAction,
    InitFormAction,
    AddSponsorAction,
    DeleteSponsorAction,
    LoadSponsorsCompletedAction
} from "../types/Sponsors.actions.types";
import ActionsTypesEnum from "../enums/Sponsors.actions.types.enum";
import ISponsor, { ISponsorForm } from "../interfaces/Sponsor.interfaces";

function loadSponsors(): LoadSponsorAction {
    return {
        type: ActionsTypesEnum.LOAD_SPONSORS,
        loading: true
    };
}

function loadSponsorsCompleted(sponsors:Array<ISponsor>): LoadSponsorsCompletedAction {
    return {
        type: ActionsTypesEnum.LOAD_SPONSORS_COMPLETED,
        loading: true,
        sponsors
    };
}

function fullfilledSponsors(sponsors: Array<ISponsor>): FullfilledSponsorAction {
    return {
        type: ActionsTypesEnum.FULFILLED_SPONSORS,
        sponsors,
        loading: false
    };
}

function initSponsorForm(sponsor: ISponsorForm): InitFormAction {
    return {
        type: ActionsTypesEnum.INIT_FORM,
        sponsor,
        loading: false
    };
}

function addSponsor(sponsor: ISponsorForm): AddSponsorAction {
    return {
        type: ActionsTypesEnum.ADD_SPONSOR,
        sponsor,
        loading: true
    };
}

function deleteSponsor(documents: Array<string>): DeleteSponsorAction {
    return {
        type: ActionsTypesEnum.DELETE_SPONSOR,
        documents,
        loading: true
    };
}

export {
    loadSponsors,
    loadSponsorsCompleted,
    fullfilledSponsors,
    initSponsorForm,
    addSponsor,
    deleteSponsor
};