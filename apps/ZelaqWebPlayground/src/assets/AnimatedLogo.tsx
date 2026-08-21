import styles from './AnimatedLogo.module.css'

export const AnimatedLogo = ({ height = 50, width }: { height?: number; width?: number }) => {
    return (
        <svg
            viewBox="0 0 251.60909 142.491"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Zelaq"
            height={height}
            width={width}
        >
            <g transform="translate(265.48324,220.48604)">
                <g transform="matrix(15.943913,0,0,15.943913,-1495.7888,-1946.3601)">
                    <path
                        d="m 77.361686,108.28634 v 0.74621 h 1.431954 l -1.575098,6.11383 v 0.7767 h 2.468584 v -0.74672 h -1.539958 l 1.575098,-6.20428 v -0.68574 z"
                        fill-opacity="0"
                        stroke-width="0.06"
                        className={styles.path}
                        pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"
                    >
                        <animate id="zStroke" attributeName="stroke-dashoffset" from="1" to="0" dur="0.8s" begin="0s" fill="freeze" />
                        <animate attributeName="fill-opacity" from="0" to="1" dur="0.8s" begin="zStroke.end" fill="freeze" />
                    </path>
                    <path
                        className={styles.path}
                        d="m 80.319465,108.28635 v 7.63674 h 2.299602 v -0.74672 h -1.401465 v -6.14382 h 1.384411 v -0.74621 z"
                        fill-opacity="0"
                        stroke-width="0.06"
                        pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"
                    >
                        <animate id="eStroke" attributeName="stroke-dashoffset" from="1" to="0" dur="0.8s" begin="0.18s" fill="freeze" />
                        <animate attributeName="fill-opacity" from="0" to="1" dur="0.8s" begin="eStroke.end" fill="freeze" />
                    </path>
                    <path
                        d="m 83.197918,108.28634 v 7.63674 h 2.307869 v -0.74207 h -1.409733 v -6.89467 z"
                        fill-opacity="0"
                        stroke-width="0.06"
                        pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"
                        className={styles.path}
                    >
                        <animate id="lStroke" attributeName="stroke-dashoffset" from="1" to="0" dur="0.8s" begin="0.36s" fill="freeze" />
                        <animate attributeName="fill-opacity" from="0" to="1" dur="0.8s" begin="lStroke.end" fill="freeze" />
                    </path>
                    <path
                        d="m 87.014002,108.28546 -1.158586,7.63674 h 0.854728 c 0.515522,-3.76892 0.386669,-2.80664 0.854682,-6.22236 h 0.01292 c 1.642346,11.07056 -0.387411,-2.78525 0.932676,6.22236 h 0.84646 l -1.262972,-7.63674 z"
                        fill-opacity="0"
                        stroke-width="0.06"
                        pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"
                        className={styles.path}

                    >
                        <animate id="aStroke" attributeName="stroke-dashoffset" from="1" to="0" dur="0.8s" begin="0.54s" fill="freeze" />
                        <animate attributeName="fill-opacity" from="0" to="1" dur="0.8s" begin="aStroke.end" fill="freeze" />
                    </path>
                    <path
                        d="m 91.390346,108.24388 c -0.468597,0 -0.825902,0.12683 -1.07177,0.38138 -0.312398,0.32396 -0.468705,0.92023 -0.468705,1.788 v 3.36672 c 0,0.79257 0.106861,1.36235 0.320911,1.70946 0.216943,0.34711 0.562739,0.5366 1.037146,0.56844 l 0.997872,1.08469 0.44235,-0.4036 -0.668176,-0.77204 c 0.240083,-0.0897 0.425355,-0.23999 0.555521,-0.45114 0.222728,-0.36447 0.334347,-0.94324 0.334347,-1.73581 v -3.36672 c 0,-0.55248 -0.05669,-0.99544 -0.169499,-1.32808 -0.190909,-0.56116 -0.62735,-0.8413 -1.309997,-0.8413 z m -0.0088,0.77205 c 0.23719,0 0.39474,0.10262 0.472839,0.30799 0.0781,0.20248 0.117306,0.54831 0.117306,1.03715 v 3.42769 c 0,0.57562 -0.04045,0.97038 -0.12144,1.18443 -0.08099,0.21116 -0.244541,0.31678 -0.490409,0.31678 -0.245869,0 -0.409418,-0.10438 -0.49041,-0.31265 -0.08099,-0.21116 -0.121439,-0.60715 -0.121439,-1.18856 v -3.43234 c 0,-0.47728 0.04645,-0.81959 0.139009,-1.02785 0.09256,-0.20826 0.257352,-0.31264 0.494544,-0.31264 z"
                        fill-opacity="0"
                        stroke-width="0.06"
                        pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"
                        className={styles.path}
                    >
                        <animate id="qStroke" attributeName="stroke-dashoffset" from="1" to="0" dur="0.8s" begin="0.72s" fill="freeze" />
                        <animate attributeName="fill-opacity" from="0" to="1" dur="0.8s" begin="qStroke.end" fill="freeze" />
                    </path>
                </g>
            </g>
        </svg>
    )
}