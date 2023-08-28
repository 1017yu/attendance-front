import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { signInState } from '@/recoil/logIn';
import Button from '@/components/common/Button';
import { requestSignIn } from '@/api/auth/logIn';
import AuthBox from '@/components/auth/AuthBox';
import AuthSignInInput from '@/components/auth/sign-in/AuthSignInInput';

export default function AuthSignInBox() {
  const router = useRouter();
  const signInInfo = useRecoilValue(signInState);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await requestSignIn({
        email: signInInfo.email,
        password: signInInfo.password
      });

      // 로그인 성공 시
      if (response.data.success) {
        // 액세스 토큰
        const accessToken = response.data.data.token.accessToken;
        // 현재 시간 + 만료 시간 = 만료일
        const expireDate = new Date(
          Date.now() + response.data.data.token.accessTokenExpireDate
        );
        // 사원 id
        const employeeId = response.data.data.employee.id;

        // role
        const role = response.data.data.employee.role;

        // 쿠키 생성
        // secure: 패킷 감청을 막기 위해 https 통신 시에만 해당 쿠키를 사용
        // SameSite = strict;  같은 도메인 범위에서만 해당 쿠키를 사용
        document.cookie = `accessToken=${accessToken}; path=/; secure; SameSite=strict;`;
        document.cookie = `expires=${expireDate.toUTCString()}; path=/; secure; SameSite=strict;`;
        document.cookie = `employeeId=${employeeId}; path=/; secure; SameSite=strict;`;
        document.cookie = `role=${role}; path=/; secure; SameSite=strict;`;

        // 관리자면 admin-manage 페이지로 라우팅
        if (response.data.data.employee.role === 'ADMIN') {
          router.push('/admin-manage');
        } else {
          // main 페이지로 라우팅
          router.push('/main');
        }
      }
      // 로그인 실패 시
      else {
        // 실패 메시지 alert
        alert(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthBox>
      <form onSubmit={handleLogin}>
        <AuthSignInInput />
        <Button contents={'로그인'} submit />
        <div className="flex justify-between sm:mt-6 mt-4 mb-12 sm:mb-0">
          <Link
            href="/sign-up"
            className="flex justify-center cusor-pointer w-1/2 text-base sm:px-16 border-r border-r-mainGray text-mainBlack">
            회원가입
          </Link>
          <Link
            href="/find-pw"
            className=" w-1/2 cusor-pointer flex justify-center text-base sm:px-16 text-mainBlack">
            비밀번호 찾기
          </Link>
        </div>
      </form>
    </AuthBox>
  );
}
