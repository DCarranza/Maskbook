import { makeStyles } from '@masknet/theme'

import { CardContent, Paper, Typography, Grid, Divider } from '@material-ui/core'
import { BondTokenIconCircle } from '../BarnBridgeIcon'
import {
    COLOR_BARNBRIDGE_ORANGE,
    COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK,
    COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
    COLOR_BARNBRIDGE_BACKGROUND_DARK,
    COLOR_BARNBRIDGE_TEXT_DARK,
    COLOR_BARNBRIDGE_TEXT_LIGHT,
} from '../constants'

import { useI18N } from '../../../utils/i18n-next-ui'

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: 'var(--contentHeight)',
        padding: '0 !important',
    },
    tabs: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
        borderBottom: `solid 1px ${theme.palette.divider}`,
        borderLeft: `solid 1px ${theme.palette.divider}`,
        color: theme.palette.mode === 'dark' ? COLOR_BARNBRIDGE_TEXT_DARK : COLOR_BARNBRIDGE_TEXT_LIGHT,
    },
    indicator: {
        backgroundColor: COLOR_BARNBRIDGE_ORANGE,
    },
    tab: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'centered',
    },
    icon: {
        paddingTop: 6,
        color: COLOR_BARNBRIDGE_ORANGE,
    },
    contentContainer: {
        backgroundColor:
            theme.palette.mode === 'dark' ? COLOR_BARNBRIDGE_BACKGROUND_DARK : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
        display: 'flex',
        flexDirection: 'column',
    },
    topBar: {
        borderBottom: `solid 1px ${theme.palette.divider}`,
        borderLeft: `solid 1px ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'row',
        height: 53,
        borderRadius: 0,
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
    },
    topBarCell: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
    },
    tapBarCellTitle: {
        color: '#939496',
    },
    tapBarCellRow: {
        paddingTop: 3,
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: 75,
    },
    tapBarCellRowContent: {
        caption: {
            fontSize: [30, '!important'],
        },
        alignItems: 'center',
        display: 'flex',
    },
    tapBarCellRowIcon: {
        alignItems: 'center',
        height: 30,
        width: 30,
        display: 'flex,',
    },
    myRewardsContainer: {
        paddingLeft: 20,
        borderLeft: `solid 1px ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 0,
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
    },
    myRewards: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
        color: COLOR_BARNBRIDGE_ORANGE,
        flexDirection: 'row',
        display: 'flex,',
    },
    gridRoot: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        flexGrow: 1,
    },
    gridPaper: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
        padding: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        color: theme.palette.text.secondary,
    },
    gridCellTitle: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
        color: COLOR_BARNBRIDGE_ORANGE,
        display: 'flex',
        paddingBottom: 15,
    },
    gridCellValue: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? COLOR_BARNBRIDGE_BACKGROUND_CARD_DARK
                : COLOR_BARNBRIDGE_BACKGROUND_CARD_LIGHT,
        display: 'flex',
        color: theme.palette.mode === 'dark' ? COLOR_BARNBRIDGE_TEXT_DARK : COLOR_BARNBRIDGE_TEXT_LIGHT,
    },
}))

export function YieldFarmingView() {
    const { classes } = useStyles()
    const { t } = useI18N()

    return (
        <CardContent className={classes.root}>
            <Paper className={classes.contentContainer}>
                <Paper className={classes.myRewardsContainer}>
                    <Typography className={classes.myRewards} variant="overline">
                        {t('plugin_barnbridge_yield_farming_rewards')}
                    </Typography>
                </Paper>
                <Paper className={classes.topBar}>
                    <Paper className={classes.topBarCell}>
                        <Typography className={classes.tapBarCellTitle} variant="caption">
                            {t('plugin_barnbridge_yield_farming_current_rewards')}
                        </Typography>
                        <Paper className={classes.tapBarCellRow}>
                            <Typography className={classes.tapBarCellRowContent} variant="caption" fontSize={16}>
                                90.4
                            </Typography>
                            <BondTokenIconCircle className={classes.tapBarCellRowIcon} />
                        </Paper>
                    </Paper>
                    <Divider orientation="vertical" flexItem />
                    <Paper className={classes.topBarCell}>
                        <Typography className={classes.tapBarCellTitle} variant="caption">
                            {t('plugin_barnbridge_yield_farming_bond_balance')}
                        </Typography>
                        <Paper className={classes.tapBarCellRow}>
                            <Typography className={classes.tapBarCellRowContent} variant="caption" fontSize={16}>
                                103
                            </Typography>
                            <BondTokenIconCircle className={classes.tapBarCellRowIcon} />
                        </Paper>
                    </Paper>
                    <Divider orientation="vertical" flexItem />
                    <Paper className={classes.topBarCell}>
                        <Typography className={classes.tapBarCellTitle} variant="caption">
                            {t('plugin_barnbridge_yield_farming_rewards_this_epoch')}
                        </Typography>
                        <Paper className={classes.tapBarCellRow}>
                            <Typography className={classes.tapBarCellRowContent} variant="caption" fontSize={16}>
                                2334
                            </Typography>
                            <BondTokenIconCircle className={classes.tapBarCellRowIcon} />
                        </Paper>
                    </Paper>
                </Paper>

                <Grid className={classes.gridRoot} container spacing={1}>
                    <Grid item xs={6}>
                        <Paper className={classes.gridPaper}>
                            <Typography className={classes.gridCellTitle} variant="caption">
                                {t('plugin_barnbridge_yield_farming_tvl')}
                            </Typography>
                            <Typography className={classes.gridCellValue} variant="h5">
                                $12,345,678
                            </Typography>
                            <Typography className={classes.tapBarCellTitle} variant="caption">
                                $101,192,261 effective locked
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.gridPaper}>
                            <Typography className={classes.gridCellTitle} variant="caption">
                                {t('plugin_barnbridge_yield_farming_bond_rewards')}
                            </Typography>
                            <Typography className={classes.gridCellValue} variant="h5">
                                10,000,000
                            </Typography>
                            <Typography className={classes.tapBarCellTitle} variant="caption">
                                out of 2,860,000
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.gridPaper}>
                            <Typography className={classes.gridCellTitle} variant="caption">
                                {t('plugin_barnbridge_yield_farming_bond_price')}
                            </Typography>
                            <Typography className={classes.gridCellValue} variant="h5">
                                $24.08
                            </Typography>
                            <Typography className={classes.tapBarCellTitle} variant="caption">
                                Uniswap market
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.gridPaper}>
                            <Typography className={classes.gridCellTitle} variant="caption">
                                {t('plugin_barnbridge_yield_farming_time_left')}
                            </Typography>
                            <Typography className={classes.gridCellValue} variant="h5">
                                2d 18h 42m 12s
                            </Typography>
                            <Typography className={classes.tapBarCellTitle} variant="caption">
                                {t('plugin_barnbridge_yield_farming_until_next_epoch')}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </CardContent>
    )
}
