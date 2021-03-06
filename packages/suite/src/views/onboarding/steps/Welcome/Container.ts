import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dispatch } from '@suite-types';
import * as onboardingActions from '@onboarding-actions/onboardingActions';

import Step from './index';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    goToNextStep: bindActionCreators(onboardingActions.goToNextStep, dispatch),
});

export type Props = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(Step);
