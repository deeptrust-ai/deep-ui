import cn from 'classnames';
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
            {userMenuItems.map((item) => {
              const itemContent = (
                <>
                  {item.icon ? <item.icon size={14} /> : null}
                  {item.label}
                </>
              );

              let itemElement: React.ReactNode;
              if ('anchorComponent' in item && item.anchorComponent) {
                const AnchorComponent = item.anchorComponent;
                itemElement = (
                  <AnchorComponent {...item.anchorProps} className={cn(styles.menuButton, item.anchorProps?.className)}>
                    {itemContent}
                  </AnchorComponent>
                );
              } else if ('href' in item && typeof item.href === 'string') {
                itemElement = <Link href={item.href}>{itemContent}</Link>;
              } else {
                itemElement = (
                  <button type="button" onClick={'onClick' in item ? item.onClick : undefined} className={styles.menuButton}>
                    {itemContent}
                  </button>
                );
              }

              return (
                <DropdownMenu.Item key={item.label} asChild shortcut={item.shortcut}>
                  {itemElement}
                </DropdownMenu.Item>
              );
            })}
            {logout ? (
              <>
                <DropdownMenu.Separator />
                <DropdownMenu.Item shortcut="⌘ Q" color="red" asChild>
                  {('anchorComponent' in logout && logout.anchorComponent) ? (
                    (() => {
                      const LogoutAnchor = logout.anchorComponent;
                      return (
                        <LogoutAnchor {...logout.anchorProps} className={cn(styles.menuButton, logout.anchorProps?.className)} data-destructive="true">
                          <SignOutIcon size={14} />
                          {logout.label ?? 'Logout'}
                        </LogoutAnchor>
                      );
                    })()
                  ) : ('href' in logout && typeof logout.href === 'string') ? (
                    <Link href={logout.href}>
                      <SignOutIcon size={14} />
                      {logout.label ?? 'Logout'}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={'onClick' in logout ? logout.onClick : undefined}
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
