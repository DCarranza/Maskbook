import { BB_SY_CREAM, BB_SY_AAVE, BB_SY_COMPOUND, APP_URL, SY_URL_FRAGMENT, API_URL } from '../constants'
import type { SYCoinProps } from '../UI/SmartYieldPoolView'
import { useAsyncRetry } from 'react-use'
import urlcat from 'urlcat'

export type SYPoolModelData = { [id: string]: SYCoinProps[] }

export function SmartYieldPoolModelGetData() {
    return useAsyncRetry(async () => {
        const response = await fetch(urlcat(API_URL, '/smartyield/pools', { originator: 'all' }), {
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        })
        const protocolsMap: SYPoolModelData = {}

        interface Payload<T> {
            data: T
        }
        interface Entry {
            protocolId: string
            underlyingSymbol: string
            state: State
        }
        interface State {
            seniorApy: number
            juniorApy: number
            seniorLiquidity: string
            juniorLiquidity: string
        }

        const payload: Payload<Entry[]> = await response.json()
        payload.data.map((entry) => {
            const protocolId = PrettifyProtocolName(entry.protocolId)
            if (!(protocolId in protocolsMap)) {
                protocolsMap[protocolId] = []
            }
            const seniorAPY = Number.parseInt((entry.state.seniorApy * 100).toFixed(2), 10)
            const juniorAPY = Number.parseInt((entry.state.juniorApy * 100).toFixed(2), 10)
            protocolsMap[protocolId] = protocolsMap[protocolId].concat([
                {
                    coinName: entry.underlyingSymbol,
                    seniorLiquidity: PrettifyLiquidity(entry.state.seniorLiquidity),
                    seniorAPY: seniorAPY,
                    juniorLiquidity: PrettifyLiquidity(entry.state.juniorLiquidity),
                    juniorAPY: juniorAPY,
                    redirectUrl: ConstructRedirectUrl(entry.protocolId, entry.underlyingSymbol),
                },
            ])
        })

        return protocolsMap
    }, [])
}

function PrettifyProtocolName(name: string) {
    if (name === 'aave/v2') {
        return BB_SY_AAVE
    } else if (name === 'compound/v2') {
        return BB_SY_COMPOUND
    } else if (name === 'cream/v2') {
        return BB_SY_CREAM
    }
    return name
}

function ConstructRedirectUrl(protocolName: string, coin: string) {
    return urlcat(APP_URL, `${SY_URL_FRAGMENT}/stats`, { m: protocolName, t: coin })
}

function PrettifyLiquidity(liquidity: string) {
    const value = Number.parseInt(liquidity, 10)
    const unit = Math.round(Math.log(value) / Math.log(1000))
    const symbols = ['', 'k', 'M', 'G', 'T'] // see https://en.wikipedia.org/wiki/Metric_prefix
    return Math.round(value / Math.pow(1000, unit)) + symbols[unit]
}
