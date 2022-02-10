import { Context } from 'near-sdk-as';

/**
 * @class Candidate
 * @property accountId        - applicant ID
 * @property firstName        - applicant first name
 * @property lastName         - applicant last name
 * @property email            - applicant email
 */
@nearBindgen
export class Candidate {
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(firstName: string, lastName: string, email: string) {
        this.accountId = Context.sender;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
