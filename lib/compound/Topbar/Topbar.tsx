import { Button, DropdownMenu, Flex, IconButton, Link } from '@radix-ui/themes';
import { Avatar } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import type { ITopbarProps } from './Topbar.types';
import { SignOutIcon } from '@phosphor-icons/react';

const Topbar = ({
  breadcrumbs,
  organizations,
  userName,
  userPfp,
  userMetaDropdown,
}: ITopbarProps) => {
  const hasLogout = userMetaDropdown?.logOutLink || userMetaDropdown?.logOutOnClick;
  const logOutOnClick = userMetaDropdown?.logOutOnClick;
  const logOutLink = userMetaDropdown?.logOutLink;

  return (
    <Flex justify="between" align="center" p="4">
      <Breadcrumbs organizations={organizations} crumbs={breadcrumbs} />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" radius="full">
            <Avatar name={userName} pfp={userPfp} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {userMetaDropdown?.dropdownItem?.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              asChild
              shortcut={item.shortcut}
            >
              {item.link ? (
                <Link href={item.link}>
                  {item.icon && <item.icon size={14} />}
                  {item.label}
                </Link>
              ) : (
                <Button variant="ghost" size="1" onClick={item.onClick}>
                  {item.icon && <item.icon size={14} />}
                  {item.label}
                </Button>
              )}
            </DropdownMenu.Item>
          ))}
          {hasLogout && (
            <>
              <DropdownMenu.Separator />
              <DropdownMenu.Item shortcut="⌘ Q" color="red" asChild>
                {logOutLink ? (
                  <Link href={logOutLink}>
                    <SignOutIcon size={14} />
                    Logout
                  </Link>
                ) : (
                  <Button variant="ghost" size="1" onClick={logOutOnClick} color="red">
                    <SignOutIcon size={14} />
                    Logout
                  </Button>
                )}
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default Topbar;
