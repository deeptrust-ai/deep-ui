import { DropdownMenu, Flex, IconButton, Link } from '@radix-ui/themes';
import { SignOutIcon } from '@phosphor-icons/react';
import type { ITopbarProps } from './Topbar.types';
import { Avatar, MenuItem } from '../../atom';
import { Breadcrumbs } from '../../molecule';
import styles from './styles.module.css';

const Topbar = ({
  organizations,
  workspaces = [],
  pages = [],
  disableOrganizationsDropdown = false,
  disableWorkspacesDropdown = false,
  selectedOrganizationId,
  selectedWorkspaceIds,
  defaultSelectedWorkspaceIds,
  onOrganizationSelect,
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
          disableOrganizationsDropdown={disableOrganizationsDropdown}
          disableWorkspacesDropdown={disableWorkspacesDropdown}
          selectedOrganizationId={selectedOrganizationId}
          workspaces={workspaces}
          selectedWorkspaceIds={selectedWorkspaceIds}
          defaultSelectedWorkspaceIds={defaultSelectedWorkspaceIds}
          onOrganizationSelect={onOrganizationSelect}
          onWorkspaceSelectionChange={onWorkspaceSelectionChange}
        />

        <Flex align="center" justify="end" gap="2">
          {links.map((link) => {
            const href =
              typeof link.anchorProps?.to === 'string'
                ? link.anchorProps.to
                : link.anchorProps?.href;

            if (!href) {
              return null;
            }

            const normalizedAnchorProps =
              link.anchorComponent || !link.anchorProps?.to
                ? link.anchorProps
                : (() => {
                    const { to, href: currentHref, ...anchorProps } = link.anchorProps;

                    return {
                      ...anchorProps,
                      href: to ?? currentHref,
                    };
                  })();

            return (
              <MenuItem
                key={`${link.label}-${href}`}
                anchorComponent={link.anchorComponent}
                anchorProps={normalizedAnchorProps}
                icon={link.icon}
                label={link.label}
                selected={link.selected}
                activeClassName={link.activeClassName}
              />
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
