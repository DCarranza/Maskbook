import { makeStyles } from '@masknet/theme'

import { Typography, Divider, LinearProgress, useTheme } from '@material-ui/core'
import { formatUSDValue } from './web3/utils'
import { useI18N } from '../../../../utils/i18n-next-ui'
import {
    COLOR_SY_SENIOR_TEXT,
    COLOR_SY_JUNIOR_TEXT,
    COLOR_BARNBRIDGE_TEXT_LIGHT,
    COLOR_BARNBRIDGE_TEXT_DARK,
} from '../../constants'

const useStyles = makeStyles()((theme) => ({
    progress: {
        display: 'flex',
        marginTop: 24,
        '& .MuiLinearProgress-colorPrimary': {
            backgroundColor: COLOR_SY_JUNIOR_TEXT,
        },
        '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: COLOR_SY_SENIOR_TEXT,
        },
    },
    dataColumn: {
        paddingLeft: 16,
        position: 'relative',
        borderRadius: '50%',
        height: 8,
        left: 0,
        top: 4,
        width: 8,
    },
    portfolioAmountContainer: {
        display: 'flex',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between',
        alignSelf: 'space-between',
        alignContent: 'space-between',
        alignItems: 'space-between',
        flex: 1,
        flexDirection: 'row',
    },
}))

type PortfolioPropsLabel = [string, number]

type Props = {
    total: number
    data: [PortfolioPropsLabel, PortfolioPropsLabel]
}

const PortfolioBalance: React.FC<Props> = (props: Props) => {
    const { classes } = useStyles()
    const { t } = useI18N()
    const {
        total,
        data: [[label1, value1], [label2, value2]],
    } = props

    const progress = ((value1 ?? 0) * 100) / ((value1 ?? 0) + (value2 ?? 0))
    const textColor = useTheme().palette.mode === 'dark' ? COLOR_BARNBRIDGE_TEXT_DARK : COLOR_BARNBRIDGE_TEXT_LIGHT

    return (
        <div>
            <div>
                <Typography variant="body1" color={textColor}>
                    {t('plugin_barnbridge_sy_portfolio_balance')}
                </Typography>
            </div>
            <div>
                <div>
                    <Typography variant="h2" color={textColor}>
                        {formatUSDValue(total)}
                    </Typography>
                </div>
            </div>
            <Divider />
            <LinearProgress
                className={classes.progress}
                classes={{ barColorPrimary: COLOR_SY_SENIOR_TEXT }}
                variant="determinate"
                value={progress}
            />
            <div className={classes.portfolioAmountContainer}>
                <div>
                    <Typography variant="subtitle1" color={COLOR_SY_SENIOR_TEXT}>
                        {label1}
                    </Typography>
                    <Typography variant="body1" color={textColor}>
                        {formatUSDValue(value1)}
                    </Typography>
                </div>
                <div>
                    <Typography variant="subtitle1" color={COLOR_SY_JUNIOR_TEXT}>
                        {label2}
                    </Typography>
                    <Typography variant="body1" color={textColor}>
                        {formatUSDValue(value2)}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default PortfolioBalance
