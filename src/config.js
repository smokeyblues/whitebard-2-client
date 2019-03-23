const dev = {
    s3: {
        REGION: "us-west-2",
        BUCKET: "whitebard-2-api-dev-whitebardcsvbucket-1dks629tyksia"
    },
    apiGateway: {
        REGION: "us-west-2",
        URL: "https://qrgl7r3bqi.execute-api.us-west-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-west-2",
        USER_POOL_ID: "us-west-2_Xaykl5D2f",
        APP_CLIENT_ID: "5nbaidql1ca86queejb9h9e7nh",
        IDENTITY_POOL_ID: "us-west-2:eb2f368a-dabf-48fa-80f3-2001868e5123"
    }
};

const prod = {
    s3: {
        REGION: "us-west-2",
        BUCKET: "whitebard-2-api-prod-whitebardcsvbucket-1kqz2w2er97uu"
    },
    apiGateway: {
        REGION: "us-west-2",
        URL: "https://m0ddae4gcb.execute-api.us-west-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-west-2",
        USER_POOL_ID: "us-west-2_tsxUun5Mr",
        APP_CLIENT_ID: "4b9tnqmfgnqranqva85e8vlmkf",
        IDENTITY_POOL_ID: "us-west-2:14bd4faf-e3ea-446c-a274-d88013a0f2a4"
    }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};
