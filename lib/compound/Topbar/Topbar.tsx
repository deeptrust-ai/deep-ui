import { DropdownMenu, Flex, IconButton, Link, Text } from '@radix-ui/themes';
import { SignOutIcon } from '@phosphor-icons/react';
import type { ITopbarProps } from './Topbar.types';
import { Avatar } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import styles from './styles.module.css';

const Topbar = ({
  organizations,
  workspaces = [],
  pages = [],
  selectedOrganizationId,
  selectedWorkspaceIds,
  onWorkspaceSelectionChange,
  links = [],
  userName,
  userPfp,
  userMenuItems = [],
  logout,
}: ITopbarProps) => {
  const hasUserMenu = userMenuItems.length > 0 || !!logout;
  return (
    <Flex
      justify="between"
      align="center"
      p="4"
      data-testid="app-topbar"
      width="100%"
      gap="4"
      className={styles.topbar}
      flexGrow="1"
    >
      <Flex align="center" gap="4" width="100%" flexGrow="1">
        <Breadcrumbs
          pages={pages}
          organizations={organizations}
          selectedOrganizationId={selectedOrganizationId}
          workspaces={workspaces}
          selectedWorkspaceIds={selectedWorkspaceIds}
          onWorkspaceSelectionChange={onWorkspaceSelectionChange}
        />

        <Flex align="center" justify="end" gap="2">
          {links.map((link) => {
            const href = link.anchorProps.to ?? link.anchorProps.href;

            if (!href) {
              return null;
            }

            return (
              <Link
                key={`${link.label}-${href}`}
                href={href}
                aria-current={link.anchorProps['aria-current']}
                data-selected={link.selected ? 'true' : 'false'}
                className={styles.link}
              >
                {link.icon ? <link.icon size={16} /> : null}
                <Text size="2">{link.label}</Text>
              </Link>
            );
          })}
        </Flex>
      </Flex>

      {hasUserMenu ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" radius="full" aria-label="User menu">
              <Avatar name={userName} pfp={userPfp} />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {userMenuItems.map((item) => (
              <DropdownMenu.Item key={item.label} asChild shortcut={item.shortcut}>
                {'href' in item ? (
                  <Link href={item.href}>
                    {item.icon ? <item.icon size={14} /> : null}
                    {item.label}
                  </Link>
                ) : (
                  <button type="button" onClick={item.onClick} className={styles.menuButton}>
                    {item.icon ? <item.icon size={14} /> : null}
                    {item.label}
                  </button>
                )}
              </DropdownMenu.Item>
            ))}
            {logout ? (
              <>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut="⌘ Q" color="red" asChild>
                  {'href' in logout ? (
                    <Link href={logout.href}>
                      <SignOutIcon size={14} />
                      {logout.label ?? 'Logout'}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={logout.onClick}
                      className={styles.menuButton}
                      data-destructive="true"
                    >
                      <SignOutIcon size={14} />
                      {logout.label ?? 'Logout'}
                    </button>
                  )}
                </DropdownMenu.Item>
              </>
            ) : null}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Avatar name={userName} pfp={userPfp} />
      )}
    </Flex>
  );
};

export default Topbar;
