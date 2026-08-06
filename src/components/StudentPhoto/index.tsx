import { Camera, UserRound } from 'lucide-react';
import type { StudentPhotoProps } from './types';
export function StudentPhoto({ src, name }: StudentPhotoProps) {
	return (
		<div className="relative mx-auto h-36 w-36 overflow-visible rounded-full border-[3px] border-[#98c9db] bg-[#edf7fa] p-1 shadow-[0_10px_24px_rgb(8_125_181_/_0.14)]">
			{src ? (
				<div className="relative h-full w-full rounded-full overflow-hidden">
					<img
						src={src}
						alt={`Foto de ${name}`}
						className="absolute inset-0 h-full w-full object-cover object-center"
						decoding="async"
					/>
				</div>
			) : (
				<div className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-[#9bcde0] to-[#6daecb] text-white">
					<UserRound size={82} strokeWidth={1.2} />
				</div>
			)}

			{!src && (
				<span className="absolute bottom-0 right-0 grid h-11 w-11 place-items-center rounded-full border-4 border-white bg-[#4fc5c2] text-white shadow-sm">
					<Camera size={20} />
				</span>
			)}
		</div>
	);
}
