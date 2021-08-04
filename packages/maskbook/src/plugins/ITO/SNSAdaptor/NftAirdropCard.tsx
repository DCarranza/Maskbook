import formatDateTime from 'date-fns/format'
import { useSpaceStationCampaignInfo } from './hooks/useSpaceStationCampaignInfo'
import { ChainId, TransactionStateType, useAccount, resolveTransactionLinkOnExplorer } from '@masknet/web3-shared'
import { EthereumWalletConnectedBoundary } from '../../../web3/UI/EthereumWalletConnectedBoundary'
import { EthereumChainBoundary } from '../../../web3/UI/EthereumChainBoundary'
import { Box, makeStyles, Typography, Button, TextField, useTheme, CircularProgress, Link } from '@material-ui/core'
import { useSpaceStationClaimableTokenCountCallback } from './hooks/useSpaceStationClaimableTokenCountCallback'
import { useSpaceStationContractClaimCallback } from './hooks/useSpaceStationContractClaimCallback'
import { useSpaceStationClaimable } from './hooks/useSpaceStationClaimable'
import { useI18N } from '../../../utils'
import { useState, useEffect } from 'react'
import { useSnackbar, OptionsObject } from '@masknet/theme'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#fff',
        width: 496,
        height: 340,
        padding: 20,
        borderRadius: 12,
        marginBottom: theme.spacing(1.5),
        background: 'linear-gradient(rgba(234, 69, 96, 1), rgba(255, 126, 172, 1))',
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: theme.spacing(1.5),
    },
    text: {
        fontSize: 16,
    },
    subText: {
        fontSize: 14,
    },
    claimButtonWrapper: {
        whiteSpace: 'nowrap',
        width: 130,
    },
    claimTimeWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1.5),
    },
    claimWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(1.5),
    },
    checkWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1.5),
    },
    nftsWrapper: {
        width: 285,
    },
    nftImage: {
        width: '100%',
        borderRadius: 4,
    },
    imgWrapper: {
        display: 'inline-block',
        width: 65,
        height: 85,
        marginRight: theme.spacing(1),
    },
    gallery: {
        width: '100%',
        marginBottom: theme.spacing(0.5),
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
    },
    actionButton: {
        height: 40,
        width: 130,
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.4)',
        },
    },
    address: {
        width: 340,
        color: '#fff',
        '& fieldset': {
            borderColor: '#fff !important',
        },
    },
    addressInput: {
        color: '#fff',
        padding: 13,
    },
    chainBoundary: {
        display: 'none',
    },
    loading: {
        marginLeft: theme.spacing(1),
        color: 'rgba(255, 255, 255, 0.4)',
    },
    snackbarContent: {
        color: '#fff',
        display: 'flex',
        width: 250,
        marginLeft: theme.spacing(0.5),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    snackbarTipContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    snackbarTip: {
        fontSize: 13,
        display: 'flex',
        alignItems: 'end',
    },
    snackbarIcon: {
        marginLeft: theme.spacing(0.3),
        height: 17,
        width: 17,
        cursor: 'pointer',
    },
    whiteText: {
        color: '#fff',
    },
    closeIcon: {
        cursor: 'pointer',
    },
}))

export function NftAirdropCard() {
    const { t } = useI18N()
    const classes = useStyles()
    const [checkAddress, setCheckAddress] = useState('')
    const { value: campaignInfo, loading: campaignInfoLoading } = useSpaceStationCampaignInfo()
    const [spaceStationClaimableCount, spaceStationAccountClaimableCallback, spaceStationAccountClaimableLoading] =
        useSpaceStationClaimableTokenCountCallback()
    const account = useAccount()
    const { value: claimable, loading: claimableLoading } = useSpaceStationClaimable(account)
    const loading = claimableLoading || campaignInfoLoading
    const [claimState, claimCallback] = useSpaceStationContractClaimCallback(campaignInfo!)
    const theme = useTheme()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const snackbarOptions = {
        preventDuplicate: true,
        autoHideDuration: 100000,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
        },
    }
    useEffect(() => setCheckAddress(''), [account])

    useEffect(() => {
        console.log({ claimState })
        if (claimState.type === TransactionStateType.CONFIRMED && claimState.no === 0) {
            enqueueSnackbar(
                <div className={classes.snackbarContent}>
                    <div className={classes.snackbarTipContent}>
                        <Typography>{t('plugin_airdrop_nft_claim_all')}</Typography>
                        <Typography className={classes.snackbarTip}>
                            <span>{t('plugin_airdrop_nft_claim_successful')}</span>
                            <Link
                                className={classes.whiteText}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={resolveTransactionLinkOnExplorer(
                                    ChainId.Mumbai,
                                    claimState.receipt.transactionHash,
                                )}>
                                <OpenInNewIcon className={classes.snackbarIcon} />
                            </Link>
                        </Typography>
                    </div>
                    <CloseIcon onClick={() => closeSnackbar()} className={classes.closeIcon} />
                </div>,
                {
                    variant: 'success',
                    ...snackbarOptions,
                } as OptionsObject,
            )
        } else if (claimState.type === TransactionStateType.FAILED) {
            enqueueSnackbar(
                <div className={classes.snackbarContent}>
                    <div className={classes.snackbarTipContent}>
                        <Typography>{t('plugin_airdrop_nft_claim_all')}</Typography>
                        <Typography className={classes.snackbarTip}>{t('plugin_airdrop_nft_claim_failed')}</Typography>
                    </div>
                    <CloseIcon onClick={() => closeSnackbar()} className={classes.closeIcon} />
                </div>,
                {
                    variant: 'error',
                    ...snackbarOptions,
                } as OptionsObject,
            )
        }
    }, [claimState])

    return (
        <Box className={classes.root}>
            <EthereumChainBoundary
                chainId={ChainId.Mumbai}
                noSwitchNetworkTip={true}
                switchButtonStyle={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: theme.palette.text.primary,
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.4)',
                    },
                    alignSelf: 'baseline',
                }}>
                {loading || !campaignInfo ? (
                    <CircularProgress size={16} className={classes.loading} />
                ) : (
                    <>
                        <Typography className={classes.title}>{campaignInfo.name}</Typography>
                        <div className={classes.claimTimeWrapper}>
                            <Typography className={classes.text}>{t('wallet_airdrop_nft_unclaimed_title')}</Typography>
                            {campaignInfo.endTime ? (
                                <Typography className={classes.text}>
                                    {t('plugin_airdrop_nft_end_time', {
                                        date: formatDateTime(campaignInfo.endTime * 1000, 'yyyy-MM-dd HH:mm'),
                                    })}
                                </Typography>
                            ) : null}
                        </div>
                        <div className={classes.claimWrapper}>
                            <div className={classes.nftsWrapper}>
                                <div className={classes.gallery}>
                                    {claimable
                                        ? campaignInfo.nfts.map((nft, i) => (
                                              <div className={classes.imgWrapper} key={i}>
                                                  <img src={nft.image} className={classes.nftImage} />{' '}
                                              </div>
                                          ))
                                        : null}
                                </div>
                                <Typography className={classes.text}>
                                    {claimable
                                        ? `${campaignInfo.nfts.length} ${
                                              campaignInfo.nfts.length > 1 ? 'Items' : 'Item'
                                          }`
                                        : `0 Item`}
                                </Typography>
                            </div>
                            <div className={classes.claimButtonWrapper}>
                                <EthereumWalletConnectedBoundary>
                                    <Button
                                        disabled={
                                            claimState.type === TransactionStateType.WAIT_FOR_CONFIRMING ||
                                            claimState.type === TransactionStateType.HASH ||
                                            campaignInfo.nfts.length === 0 ||
                                            !claimable
                                        }
                                        onClick={claimCallback}
                                        className={classes.actionButton}>
                                        <span>{t('plugin_airdrop_nft_claim')}</span>
                                        {claimState.type === TransactionStateType.WAIT_FOR_CONFIRMING ||
                                        claimState.type === TransactionStateType.HASH ? (
                                            <CircularProgress size={16} className={classes.loading} />
                                        ) : null}
                                    </Button>
                                </EthereumWalletConnectedBoundary>
                            </div>
                        </div>

                        <Typography className={classes.subText}>{t('plugin_airdrop_nft_check_address')}</Typography>
                        <div className={classes.checkWrapper}>
                            <TextField
                                value={checkAddress}
                                onChange={(e) => setCheckAddress(e.target.value)}
                                className={classes.address}
                                InputProps={{ classes: { input: classes.addressInput } }}
                                placeholder="Enter your wallet address"
                            />
                            <Button
                                disabled={spaceStationAccountClaimableLoading || checkAddress === ''}
                                onClick={async () => spaceStationAccountClaimableCallback(checkAddress)}
                                className={classes.actionButton}>
                                <span>{t('plugin_airdrop_nft_check')}</span>
                                {spaceStationAccountClaimableLoading ? (
                                    <CircularProgress size={16} className={classes.loading} />
                                ) : null}
                            </Button>
                        </div>
                        <Typography className={classes.text}>
                            {spaceStationClaimableCount
                                ? spaceStationClaimableCount.maxCount === -1
                                    ? t('plugin_airdrop_nft_incorrect_address')
                                    : spaceStationClaimableCount.maxCount === 0 || campaignInfo.nfts.length === 0
                                    ? t('plugin_airdrop_nft_none_to_claim')
                                    : spaceStationClaimableCount.maxCount - spaceStationClaimableCount.usedCount === 0
                                    ? t('plugin_airdrop_nft_already_claimed')
                                    : t('plugin_airdrop_nft_number_to_claim', {
                                          count:
                                              (spaceStationClaimableCount.maxCount -
                                                  spaceStationClaimableCount.usedCount) *
                                              campaignInfo.nfts.length,
                                      })
                                : null}
                        </Typography>
                    </>
                )}
            </EthereumChainBoundary>
        </Box>
    )
}
