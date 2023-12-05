import { IoSettingsOutline, IoExitOutline } from "react-icons/io5";

import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@nextui-org/react";
import { ENV } from "@/utils";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const DropdownUser = () => {
  const { user, logout } = useAuth();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

    const router= useRouter()
    
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src={
            user?.foto
              ? `${ENV.SERVER_HOST}${user.foto.formats?.thumbnail.url}`
              : ""
          }
          size="lg"
        />
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection>
          <DropdownItem
            key="ajustes"
            className="mt-3"
            startContent={<IoSettingsOutline className={iconClasses} />}
            onClick={() => router.push('/ajustes')}
          >
            Ajustes
          </DropdownItem>
          <DropdownItem
            key="salir"
            startContent={
              <IoExitOutline className={iconClasses} color="danger" />
            }
            onClick={logout}
          >
            Salir
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownUser;
